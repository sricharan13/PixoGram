package com.sba.pixogram.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.sba.pixogram.entity.ImageUrl;
import com.sba.pixogram.entity.Media;
import com.sba.pixogram.entity.UploadPic;
import com.sba.pixogram.repository.MediaRepository;
import com.sba.pixogram.service.MediaService;
import com.sba.pixogram.service.StorageService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UploadController {

	@Autowired
	StorageService storageService;
	@Autowired
	MediaService mediaService;
	@Autowired
	MediaRepository mediaRepository;

	List<String> files = new ArrayList<String>();

	@PostMapping("/post")
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,
			@RequestParam("userId") Long userId, @RequestParam("url") String url, @RequestParam("title") String title,
			@RequestParam("description") String description, @RequestParam("tags") String tags) {
		Media m = mediaService.postMedia(new Media(userId, url, title, description, tags));
		String message = "";
		try {
			storageService.store(file);
			files.add(file.getOriginalFilename());

			message = "You successfully uploaded " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			message = "FAIL to upload " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

	@GetMapping("/getallfiles")
	public ResponseEntity<List<String>> getListFiles(Model model) {
		List<String> fileNames = files
				.stream().map(fileName -> MvcUriComponentsBuilder
						.fromMethodName(UploadController.class, "getFile", fileName).build().toString())
				.collect(Collectors.toList());

		return ResponseEntity.ok().body(fileNames);
	}

	@GetMapping("/files/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		Resource file = storageService.loadFile(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}

	@PostMapping("/storeImages")
	public UploadPic storeFile(@RequestParam("file") MultipartFile file) throws IOException {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		UploadPic dbFile = new UploadPic(fileName, file.getContentType(), file.getBytes());

		return mediaRepository.save(dbFile);
	}

	@GetMapping("/downloadFile/{fileId}")
	public List<ImageUrl> downloadFile(@PathVariable long fileId) throws IOException {
		List<UploadPic> dbFile = new ArrayList<UploadPic>();

		List<ImageUrl> img = new ArrayList<ImageUrl>();
		dbFile = mediaRepository.findById(fileId);

		for (UploadPic up : dbFile) {
			int i = 1;
			byte[] blob = up.getData();

			String file_name = "C:/Users/Public/EclipseImages/" + fileId + i + ".jpg";

			File file = new File(file_name);
			FileOutputStream os = new FileOutputStream(file);
			os.write(blob);
			i++;
			os.close();
			ImageUrl im = new ImageUrl();
			im.setUrl(file_name);
			img.add(im);
		}
		System.out.print(img);
		return img;
	}

	@GetMapping("/downloadFiles/{fileId}")
	public byte[] downloadFile1(@PathVariable long fileId) throws IOException {
		List<UploadPic> dbFile = new ArrayList<UploadPic>();
		dbFile = mediaRepository.findById(fileId);
		return dbFile.get(0).getData();
	}
}

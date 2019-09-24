package com.sba.pixogram.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sba.pixogram.entity.ImageID;
import com.sba.pixogram.entity.ImageUrl;
import com.sba.pixogram.entity.MediaData;
import com.sba.pixogram.entity.UploadPic;
import com.sba.pixogram.entity.UploadProfile;
import com.sba.pixogram.repository.MediaDataRepository;
import com.sba.pixogram.repository.UploadProfileRepository;
import com.sba.pixogram.repository.UploadRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/upload")
public class UploadController {

	@Autowired
	UploadRepository uploadRepository;

	@Autowired
	UploadProfileRepository uploadProfileRepository;

	@Autowired
	MediaDataRepository mediaDataRepository;

	List<String> files = new ArrayList<String>();

	@PostMapping("/storeImages/{userId}")
	public UploadPic storeFile(@RequestParam("file") MultipartFile file, @PathVariable long userId) throws IOException {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		UploadPic dbFile = new UploadPic(fileName, file.getContentType(), file.getBytes(), userId);
		UploadPic up = uploadRepository.save(dbFile);
		MediaData mediaData = new MediaData("", "", "", up.getId());
		mediaDataRepository.save(mediaData);
		return up;
	}

	@PostMapping("/storeProfile/{userId}")
	public void storeProfile(@RequestParam("file") MultipartFile file, @PathVariable long userId) throws IOException {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		UploadProfile up = uploadProfileRepository.getProfileById(userId);
		if(up == null) {
			UploadProfile profile = new UploadProfile(fileName, file.getContentType(), file.getBytes(),userId);
			uploadProfileRepository.save(profile);
		}
		else {
			uploadProfileRepository.UpdateProfile(fileName,file.getContentType(),file.getBytes(),userId);
		}
	}

	@GetMapping("/getUserMedia/{userId}")
	public List<ImageUrl> getUserMedia(@PathVariable long userId) throws IOException {	 
		ArrayList<UploadPic> dbFile = new ArrayList<UploadPic>(); 
		List<ImageUrl> img = new ArrayList<ImageUrl>();
		List<MediaData> mediaData = new ArrayList<MediaData>();
		mediaData = uploadRepository.getImageData(userId); 
		dbFile = uploadRepository.findById(userId);
		int i = 0;
		for(UploadPic uploadPic: dbFile) {
			byte[] blob = uploadPic.getData();
			String file_name = "C:/Users/Admin/Desktop/PixoGram/pixogramFrontEnd/src/assets/images/" + userId + "_" + uploadPic.getFileName();
			File file = new File(file_name);
			FileOutputStream os = new FileOutputStream(file);
			os.write(blob);
			os.close();
			ImageUrl  imgUrl = new ImageUrl(file_name, mediaData.get(i).getTitle(), mediaData.get(i).getDescription(), mediaData.get(i).getTags());
			i++;
			img.add(imgUrl);
		}
		return img;
	}

	@GetMapping("/imagedata/{fid}")
	public List<MediaData> f(@PathVariable long fid) {
		return  uploadRepository.getImageData(fid);
	}

	@PutMapping("/storeData/{picId}")
	public void storeData(@RequestBody MediaData mData, @PathVariable long picId) throws IOException {
		mediaDataRepository.updateData(mData.getTitle(), mData.getDescription(), mData.getTags(), picId);
	}

	@GetMapping("/getImageId/{userId}")
	public List<ImageID> GetImageId(@PathVariable Long userId) {
		UploadPic uploadPic= mediaDataRepository.GetImageID(userId);
		ImageID imageId=new ImageID();
		imageId.setImageId(uploadPic.getId());
		List<ImageID> list=new ArrayList<ImageID>();
		list.add(imageId);
		return list;
	}

	@GetMapping("/getProfile/{userId}")
	public List<ImageUrl> getProfile(@PathVariable long userId) throws IOException {
		List<ImageUrl> l = new ArrayList<ImageUrl>();
		UploadProfile up = uploadProfileRepository.getProfileById(userId);
		ImageUrl image = new ImageUrl();
		byte[] blob= up.getData();
		String file_name = "C:/Users/Admin/Desktop/PixoGram/pixogramFrontEnd/src/assets/profilepics/" + userId + "_" + up.getFileName();
		File file = new File(file_name);
		FileOutputStream os = new FileOutputStream(file);
		os.write(blob); 
		os.close();
		image.setUrl(file_name);
		l.add(image);

		return l;
	}
}

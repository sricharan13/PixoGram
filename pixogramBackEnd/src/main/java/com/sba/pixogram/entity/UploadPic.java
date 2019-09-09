package com.sba.pixogram.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


@Entity
@Table(name = "files")
public class UploadPic {
		
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
	private long id;
		@Column
	    private String fileName;
		@Column
	    private String fileType;

	    @Lob
	    private byte[] data;

		public UploadPic() {
			super();
			// TODO Auto-generated constructor stub
		}

//		public String getId() {
//			return id;
//		}
//
//		public void setId(String id) {
//			this.id = id;
//		}

		public String getFileName() {
			return fileName;
		}

		public void setFileName(String fileName) {
			this.fileName = fileName;
		}

		public String getFileType() {
			return fileType;
		}

		public void setFileType(String fileType) {
			this.fileType = fileType;
		}

		public byte[] getData() {
			return data;
		}

		public void setData(byte[] data) {
			this.data = data;
		}

		public UploadPic( String fileName, String fileType, byte[] data) {
			super();
			this.fileName = fileName;
			this.fileType = fileType;
			this.data = data;
		}
	    
	    
	
}

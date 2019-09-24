package com.sba.pixogram.entity;

public class ImageUrl {

	private String url;
	private String title;
	private String description;
	private String tags;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public ImageUrl() {
		super();
	}

	public ImageUrl(String url, String title, String description, String tags) {
		super();
		this.url = url;
		this.title = title;
		this.description = description;
		this.tags = tags;
	}
}

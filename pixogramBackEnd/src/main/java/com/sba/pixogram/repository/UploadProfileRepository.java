package com.sba.pixogram.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.sba.pixogram.entity.UploadProfile;

public interface UploadProfileRepository extends CrudRepository<UploadProfile, Long> {

	@Query(value = "select f from UploadProfile f where f.userId = ?1")
	UploadProfile getProfileById(long profileId);
	
	@Transactional
	@Modifying
	@Query(value=" update UploadProfile u set u.fileName=:filename,u.fileType=:fileType,u.data=:data where u.userId=:userId")
	void UpdateProfile(@Param(value="filename")String fileName,@Param(value="fileType") String contentType,@Param(value="data") byte[] bytes,@Param(value="userId") long userId);
	
}

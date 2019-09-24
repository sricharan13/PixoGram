package com.sba.pixogram.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.sba.pixogram.entity.MediaData;
import com.sba.pixogram.entity.UploadPic;
import com.sba.pixogram.entity.User;

public interface MediaDataRepository extends CrudRepository<MediaData, Long>  {

	@Query(value=" select f from UploadPic f where f.id = (select max(f.id) from UploadPic f where f.userId=?1)")
	UploadPic GetImageID(Long userId);
	
	@Transactional
	@Modifying
	@Query(value="update MediaData m set m.title=:title, m.description=:desc, m.tags=:tags where m.imageid=:picId")
	void updateData(@Param(value="title")String title, @Param(value="desc")String desc, @Param(value="tags")String tags, @Param(value="picId")Long picId);
}

package com.sba.PixogramTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.sba.pixogram.entity.User;
import com.sba.pixogram.repository.FollowRepository;
import com.sba.pixogram.repository.UserRepository;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = com.sba.pixogram.PixogramApplication.class)
@SpringBootConfiguration
public class PixogramServerApplicationTests {


	@Autowired
	UserRepository repo;

	@Autowired
	FollowRepository followRepo;

	@Test
	public void userfindByIdTest() {
		User u= repo.userfindById(Long.valueOf(1));
		assertEquals(u.getUsername(),"sricharan13");
	}

	@Test
	public void getUsers() {
		List<User> lusers = new ArrayList<>();
		lusers = repo.getUsers(Long.valueOf(1));
		assertNotEquals(lusers,null);
	}

	@Test
	public void userUpadateTest() {
		repo.UpdateUser(Long.valueOf(1),"charan1");
		User u=repo.userfindById(Long.valueOf(1));
		assertEquals(u.getPassword(),"charan1");
	}

	@Test
	public void deleteFollowIdTest() {
		followRepo.Block(Long.valueOf(1),Long.valueOf(2));
		Long val=followRepo.res(Long.valueOf(1),Long.valueOf(2));
		assertEquals(val,Long.valueOf(1));
	}
}
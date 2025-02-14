package org.pad.api.controller

import org.pad.api.domain.Group
import org.pad.api.domain.auth.User
import org.pad.api.domain.dto.PersonalGroupDto
import org.pad.api.service.GroupService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody
import java.util.*

@Controller
class GroupController(private val groupService: GroupService) {

    @PostMapping("/group/{groupId}/add/{userId}")
    @ResponseBody
    fun addUserToGroup(@PathVariable("userId") userId: String, @PathVariable("groupId") groupId: String): List<User> {
        return groupService.addUserToGroup(UUID.fromString(groupId), UUID.fromString(userId))
    }

    @DeleteMapping("/group/{groupId}/remove/{userId}")
    @ResponseBody
    fun removeUserToGroup(@PathVariable("userId") userId: String, @PathVariable("groupId") groupId: String): List<User> {
        return groupService.removeUserToGroup(UUID.fromString(groupId), UUID.fromString(userId))
    }

    @GetMapping("/groups/my")
    @ResponseBody
    fun getUsersGroup(): List<Group> {
        return groupService.getUsersGroup()
    }

    @PostMapping("/groups/personal")
    @ResponseBody
    fun getPersonalConversation(@RequestBody body: PersonalGroupDto): Group {
        // créer un group si existe pas, groupe personel avec les 2 users
        return groupService.getPersonalConversation(UUID.fromString(body.user1), UUID.fromString(body.user2))
    }

}

package org.pad.api.service

import org.pad.api.domain.Group
import org.pad.api.domain.auth.User
import org.pad.api.domain.dto.GroupDto
import org.pad.api.domain.dto.auth.UserDto
import org.pad.api.repository.GroupRepository
import org.pad.api.repository.auth.UserRepository
import org.pad.api.service.auth.UserContext
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.util.UUID

@Service
class GroupService(
    private val groupRepository: GroupRepository,
    private val userRepository: UserRepository,
    private val webSocketService: WebSocketService,
    private val userContext: UserContext
) {

    fun addUserToGroup(groupId: UUID, userId: UUID): List<User> {
        val group = groupRepository.findById(groupId)
        val user = userRepository.findById(userId)

        if (user.isEmpty) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist")
        }
        if (group.get().members.contains(user.get())) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "User already in group")
        }
        group.get().members.add(user.get())
        groupRepository.save(group.get())
        webSocketService.notifyUser(user.get(), "/private/addToGroup", group.get().toJson())
        return group.get().members
    }

    fun removeUserToGroup(groupId: UUID, userId: UUID): List<User> {
        val group = groupRepository.findById(groupId)
        val user = userRepository.findById(userId)

        if (user.isEmpty) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist")
        }
        if (!group.get().members.contains(user.get())) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "User not in group")
        }
        group.get().members.remove(user.get())
        groupRepository.save(group.get())
        webSocketService.notifyUser(user.get(), "/private/removeFromGroup", group.get().toJson())
        return group.get().members
    }

    fun getUsersGroup(): List<Group> {
        val user = userContext.getCurrentUser() ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        return groupRepository.findByUser(user)
    }

    fun getPersonalConversation(userId1: UUID, userId2: UUID): GroupDto {
        val user1 = userRepository.findById(userId1).orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "User1 not found") }
        val user2 = userRepository.findById(userId2).orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "User2 not found") }
        val optionalGroup = groupRepository.findPersonalGroupWithTwoMembers(user1, user2)
        if (optionalGroup.isPresent) {
            return GroupDto(
                optionalGroup.get().uuid,
                optionalGroup.get().name.toString(),
                optionalGroup.get().description.toString(),
                true,
                mutableListOf(
                    UserDto(user1.username.toString(), user1.role, user1.uuid),
                    UserDto(user2.username.toString(), user2.role, user2.uuid)
                )
            )
        }
        val newGroup = Group()
        newGroup.isPersonal = true
        newGroup.name = user1.username + " " + user2.username
        newGroup.description = "Private conversation"
        newGroup.members.add(user1)
        newGroup.members.add(user2)
        val group = groupRepository.save(newGroup)
        val groupDto = GroupDto(
            group.uuid,
            group.name.toString(),
            group.description.toString(),
            true,
            mutableListOf(
                UserDto(user1.username.toString(), user1.role, user1.uuid),
                UserDto(user2.username.toString(), user2.role, user2.uuid)
            )
        )
        webSocketService.notifyUser(user2, "/queue/private/addToGroup", groupDto.toJson())
        return groupDto
    }

}

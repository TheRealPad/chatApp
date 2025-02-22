package org.pad.api.event

import lombok.RequiredArgsConstructor
import lombok.extern.slf4j.Slf4j
import org.pad.api.domain.Group
import org.pad.api.domain.dto.GroupDto
import org.pad.api.domain.dto.auth.UserDto
import org.pad.api.repository.ChatRepository
import org.pad.api.service.WebSocketService
import org.springframework.data.rest.core.annotation.HandleAfterDelete
import org.springframework.data.rest.core.annotation.HandleBeforeDelete
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import org.springframework.stereotype.Service

@Slf4j
@Service
@RepositoryEventHandler
@RequiredArgsConstructor
class GroupEvent(private val chatRepository: ChatRepository, private val webSocketService: WebSocketService) {

    @HandleBeforeDelete
    fun handleBeforeDelete(group: Group) {
        val chats = chatRepository.findByGroupOrderByCreatedDateDesc(group)
        chatRepository.deleteAll(chats)
        val groupDto = GroupDto(
            group.uuid,
            group.name.toString(),
            group.description.toString(),
            true,
            mutableListOf()
        )
        for (member in group.members) {
            webSocketService.notifyUser(member, "/queue/private/groupDeletion", groupDto.toJson())
        }
    }

}

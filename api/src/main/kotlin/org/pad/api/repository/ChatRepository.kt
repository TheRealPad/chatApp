package org.pad.api.repository

import org.pad.api.domain.Chat
import org.pad.api.domain.Group
import org.pad.api.domain.auth.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ChatRepository : JpaRepository<Chat, UUID> {

    fun findByGroupOrderByCreatedDateDesc(group: Group): List<Chat>

    @Query("SELECT COUNT(c) FROM Chat c WHERE c.group.uuid = :groupId AND c.createdDate > :date AND c.sender != :user")
    fun countChatsAfterDate(@Param("groupId") groupId: UUID, @Param("date") date: Date, @Param("user") user: User): Long

    @Query("SELECT COUNT(c) FROM Chat c WHERE c.group.uuid = :groupId")
    fun countChatsInGroup(@Param("groupId") groupId: UUID): Long

}

package org.pad.api.repository

import org.pad.api.domain.Chat
import org.pad.api.domain.Group
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ChatRepository : JpaRepository<Chat, UUID> {

    fun findByGroupOrderByCreatedDateDesc(group: Group): List<Chat>
}

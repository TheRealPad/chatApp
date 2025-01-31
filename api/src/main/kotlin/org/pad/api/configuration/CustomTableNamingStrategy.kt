package org.pad.api.configuration

import org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy
import org.hibernate.boot.model.naming.Identifier
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment
import java.util.*

class CustomTableNamingStrategy : CamelCaseToUnderscoresNamingStrategy() {

    override fun toPhysicalTableName(name: Identifier, context: JdbcEnvironment?): Identifier {
        val prefixedName = "pad_" + name.text.replaceFirstChar { it.lowercase(Locale.getDefault()) }
        return Identifier.toIdentifier(prefixedName)
    }
}

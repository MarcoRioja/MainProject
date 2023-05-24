<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<link rel="stylesheet" href="cancion.css"/>
			</head>
			<body>
				<h2>Cancion:</h2>
				<h1><xsl:value-of select="cancion/titulo"/></h1>
				<h3>(Artista: <span><xsl:value-of select="cancion/artista"/></span> )</h3>
				<br/>
				<xsl:for-each select="cancion/letra/estrofa">
					<xsl:if test="tipo = 'estribillo'">
						<h3>Estribillo:</h3>
					</xsl:if>
					<xsl:for-each select="verso">
						<p><xsl:value-of select="."/></p>
					</xsl:for-each>
					<br/>
				</xsl:for-each>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
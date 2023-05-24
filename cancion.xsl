<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<link rel="stylesheet" href="cancion.css"/>
				<link rel="stylesheet" href="menu.css"/>
				<script src="https://kit.fontawesome.com/77c525c289.js" crossorigin="anonymous"></script>
				</head>
				<body>
					<h2>Cancion:</h2>
					<h1>
						<xsl:value-of select="cancion/titulo"/>
					</h1>
					<h3>(Artista: <span>
						<xsl:value-of select="cancion/artista"/>
					</span> )
				</h3>
				<br/>
				<xsl:for-each select="cancion/letra/estrofa">
					<xsl:if test="tipo = 'estribillo'">
						<h3>Estribillo:</h3>
					</xsl:if>
					<xsl:for-each select="verso">
						<p>
							<xsl:value-of select="."/>
						</p>
					</xsl:for-each>
					<br/>
				</xsl:for-each>

				<div id="menuModal" class="modal-menu">
					<div class="modal-menu-content">
						<ul class="menu-list">
							<li></li>
							<a href="index.html">
								<button class="play-button">Inicio</button>
							</a>
							<li></li>
							<a href="solitario.html">
								<button class="play-button">Jugar</button>
							</a>
							<li></li>
							<a href="partiendo_la_pana.xml">
								<button class="play-button">Ver Canción</button>
							</a>
							<li></li>
							<a href="config.html">
								<button class="play-button">Ajustes</button>
							</a>
						</ul>
					</div>
				</div>

				
				<script src="darkMode.js"></script>
				<script src="menu.js"></script>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
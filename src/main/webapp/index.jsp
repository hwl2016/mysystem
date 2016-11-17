<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/base.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Document</title>
</head>
<body>
	<h4>Index Page</h4>
	<a href="${ctx}/files/index.html">GO My System</a>
	<p><button id="get-mofang">获取目标代码</button></p>
	
	<div class="content"></div>
	
	
	<script src="${ctx}/files/libs/jquery.min.js"></script>
	<script>
		$("#get-mofang").click(function() {
			var targetURL = 'http://www.mofangworld.com';
			$.ajax({
				url: '${ctx}/resource/byUrl?t=' + (+new Date()),
				type: 'POST',
				data: {
					targetURL: targetURL
				}
			}).done(function(resp) {
				var base = '<base href="' + targetURL + '"/>';
				resp.replace('<head>', '<head>' + base);
				console.log("===="+resp);
			}).fail(function(resp) {
				console.log("error");
			})
		})
	</script>
</body>
</html>
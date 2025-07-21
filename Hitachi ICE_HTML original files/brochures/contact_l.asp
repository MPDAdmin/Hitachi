<!-- #INCLUDE FILE = "email.asp"  -->
<%
sname=Request.Form("name")
product = Request.Form("product")
productmodel = Request.Form("productmodel")
company = Request.Form("company")
designation = Request.Form("designation")
semail=Request.Form("email")
ContactNumber = Request.Form("ContactNumber")

strSubject = "Hitachi ICE Website - Brochure Downloads"

Dim HTML
Dim objMailer
		ToName="Hitachi-ICE"
		ToEmail="christina.wah.cq@hitachi.com"

	HTML = "	Download Details <br>---------------<br>"	
	HTML = HTML & " Name: "&sname&"<br>"
	HTML = HTML & " Product Interested: "&product&"<br>"
   	HTML = HTML & " Product Model: "&productmodel&"<br>"
	HTML = HTML & " Company: "&company&"<br>"
	HTML = HTML & " Designation: "&designation&"<br>"
	HTML = HTML & " Email: "&semail&"<br>"
	HTML = HTML & " Contact Number: "&ContactNumber&"<br>"

	



			CALL SendMail(semail, Trim(ToEmail), Array(""), strSubject, HTML)

response.redirect "../brochures.html"
%>
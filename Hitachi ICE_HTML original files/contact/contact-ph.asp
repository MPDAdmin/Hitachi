<!-- #INCLUDE FILE = "email.asp"  -->
<%
sname=Request.Form("name")
company = Request.Form("company")
designation = Request.Form("designation")
semail=Request.Form("email")
ContactNumber = Request.Form("ContactNumber")
SubjectEnquiry=Request.Form("SubjectEnquiry")
Address=Request.Form("address")
enquiry=Request.Form("enquiry")
SubjectEnquiry=Request.Form("SubjectEnquiry")

strSubject = "Hitachi ICE Website - Enquiry (Philippines)"

Dim HTML
Dim objMailer
		ToName="Hitachi-ICE"
		ToEmail="christina.wah.cq@hitachi.com"

	HTML = "	Enquiry Details <br>---------------<br>"	
	HTML = HTML & " Subject: "&SubjectEnquiry&"<br>"
	HTML = HTML & " Enquiry: "&enquiry&"<br>---------------<br>"
	HTML = HTML & " Name: "&sname&"<br>"
	HTML = HTML & " Company: "&company&"<br>"
	HTML = HTML & " Designation: "&designation&"<br>"
	HTML = HTML & " Email: "&semail&"<br>"
	HTML = HTML & " Contact Number: "&ContactNumber&"<br>"
	HTML = HTML & " Address: "&address&"<br>---------------<br>"
	



			CALL SendMail(semail, Trim(ToEmail), Array(""), strSubject, HTML)

response.redirect "thank.html"
%>
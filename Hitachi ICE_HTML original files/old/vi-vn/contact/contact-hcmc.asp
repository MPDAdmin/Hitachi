<!-- #INCLUDE FILE = "email.asp"  -->
<%
sfeedback=Request.Form("your_feedback")
sdetails = Request.Form("details")
ssalutation = Request.Form("salutation")
semail=Request.Form("email")
syourname = Request.Form("yourname")
scompany = Request.Form("company")
scontact=Request.Form("contact")
scustomer=Request.Form("customer")

strSubject = "Hitachi ICE Vietnam - Văn phòng đại diện tại TP.Hồ Chí Minh"

Dim HTML
Dim objMailer
		ToName="Hitachi ICE - HAS Vietnam Air Compressor"
		ToEmail="thanh.nguyen.cg@hitachi.com; HIES-MSM-marketing@hitachi-ies.co.jp, christina.wah.cq@hitachi.com"

	HTML = "	Enquiry Details <br>---------------<br>"	
	HTML = HTML & " Office: "&sfeedback&"<br>"
	HTML = HTML & " Details: "&sdetails&"<br>---------------<br>"
	HTML = HTML & " Salutation: "&ssalutation&"<br>"
	HTML = HTML & " Name: "&syourname&"<br>"
	HTML = HTML & " Company: "&scompany&"<br>"
	HTML = HTML & " E-Mail: "&semail&"<br>"
	HTML = HTML & " Contact Number: "&scontact&"<br>"
	HTML = HTML & " Existing Customer: "&scustomer&"<br>"
	

	CALL SendMail(semail, Trim(ToEmail), Array(""), strSubject, HTML)

response.redirect "thank.html"
%>
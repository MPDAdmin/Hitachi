<%
Public Function SendMail(ByVal FrAddress, ByVal ToAddress, ByVal BCCAddress, ByVal Subject, ByVal MailBody)   

	Dim objCDOSYSCon 
	Set objcdosysmail = CreateObject("CDO.Message") 
	Set objCDOSYSCon = CreateObject ("CDO.Configuration") 
	
	'objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "www.mlionline.net" 
	objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "10.95.150.96"
	objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25 
	objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2 
	objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 60 
	objCDOSYSCon.Fields.Update 
	
	Set objcdosysmail.Configuration = objCDOSYSCon 
	objcdosysmail.From = FrAddress 
	objcdosysmail.To = ToAddress
	
	DIM bccaddr
	For Each item IN BCCAddress
		IF item <> "" THEN
			bccaddr = bccaddr & item & "; "
		END IF
	Next
	objcdosysmail.BCC = bccaddr
	
	objcdosysmail.Subject = Subject 
	objcdosysmail.HTMLBody = MailBody
	objcdosysmail.Send
	Set objcdosysmail = Nothing 
	Set objCDOSYSCon = Nothing

End Function
%>
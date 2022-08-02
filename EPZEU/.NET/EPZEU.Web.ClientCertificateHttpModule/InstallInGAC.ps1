# use this ps script to install assembly to GAC when no gacutil.exe is available on the target machine
# run the script as Administrator!

[System.Reflection.Assembly]::Load("System.EnterpriseServices, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a")
$publish = New-Object System.EnterpriseServices.Internal.Publish

# full path of the Assembly file!
$publish.GacInstall("EPZEU.Web.ClientCertificateHttpModule.dll")

Write-Output 'Assembly installed in GAC'
Pause 'Press any key to continue'
How to Run/deploy  Firebird 3 Embed Csharp App  on Windows Xp 

```
in your c# project ,

1- Properties >
 - application > target Framework:  .NET 4 Framework    ``//xp requires this``
 - build > Platform Target:   x86                       ``//cuz we are gonna use 32bit  firebird dll``

2- Manage Nuget Packages > 
   install >  
   FirebirdSql.Data.FirebirdClient    **version 5.8.1** or lower   // version level important.

3- go to webpage:  https://firebirdsql.org/en/firebird-3-0/   -> "exact version url": https://firebirdsql.org/en/firebird-3-0-3/
 - get zip file  	**Firebird-3.0.3.xxxxx_Win32.zip** 	 
   extract zip  to   folder in your project debug/firebird_3x_embedFiles/
   
   The mentinoned files are Required if you wanna run firebird 3 as Embed
   (required files may change in the next versions of firebird)
   
   make sure folder sutructure is like this:
   -debug/
    -test.FDB
    -myApp.exe
    -firebird_3x_embedFiles/
      -intlr/
      -UDF/
      -plugins/
      -fbclient.dll
      -ibutil.dll
      -icu*.dll       
      -icu*.dat
      -msvcp100.dll
      -msvcr100.dll
      
 4-You connection string in c# app 
     string connectionString =
     "ClientLibrary= Firebird_3_0_embedfiles\\fbclient.dll;";
     "User=myDbUser;" +
     "Password=myPass;" +
     "Database=test.FDB;" +
     "ServerType=1;"  
     
 
 
 ```


### if you Get this error -> "Incompatible wire encryption levels requested on client and server

1) add  **WireCrypt = Disabled** in  **firebird.conf**
   * file is here: C:\Program Files (x86)\Firebird\Firebird_3_0\firebird.conf"
2) open **services.msc**
   * Find **Firebird Server** > rightClick > **Restart**.

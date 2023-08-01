**sunlux xl9610 barcode scanner, vcom-port (vcp) driver 64bit for win7**

when u scan vcp mode user-manual, it automatically installs driver to windows 10.
but it didnt auto-install for my windows 7 work pc.!!

to solve this:
i extracted auto-installed driver from my win10 pc.
and installed it into unknown-device  on win7 pc.

## step to extract driver
1) open  device manager .
2) menu > view > [check] show hidden devices
3) yourPcName
   * connection points(com, lpt )
      * **usb serial ch341a (comNo)**
5) learn the driver name of barcodeScanner .  mine was  **usb serial ch341a (comNo)**
6) right-click > properties  (new window opens)> event tab
7)  check the list. learn the inf file name
8)  bottom item was device installed (**ch34ser.inf_amd64xxxxx**)

## how To export drivers using PowerShell from Windows 10
1) On your Windows 10, right click Start and click Windows PowerShell (admin).
2) Enter the command **Export-WindowsDriver -Online -Destination D:\DriversBackup.** 
3) The **D:\DriversBackup** is the folder where all of your computer’s third-party drivers will be exported.
4) goto **D:\DriversBackup**.  you will see folder named **ch34ser.inf_amd64xxxxx**.
5) copy this folder and paste it to win7 pc.

https://www.prajwal.org/powershell-export-drivers-from-windows/

## at windows 7 pc.   install unknows device driver 
1) open device manager. look at unknown device.
2) plug/unplug/plug barcode scanner.  be sure  the unknow device is your barcodeScanner.
3) right click on unknow device > install driver
   * scan my pc for device driver
   * locate this folder **ch34ser.inf_amd64xxxxx**.
   *  next next done.
  
it should be installed.



## Requirements ##
1. Pastikan telah terinstall NodeJS dan npm
2. jalankan perintah `npm i`
3. buat file `.env` pada root folder project dengan isi sesuai dengan data yang dikirimkan

## A. Menjalankan UI automation ##
1. Pastikan sudah ada browser chrome, jika tidak ada ubah parameter browser pada file `.testcaferc.json` sesuai dengan browser yang terinstall pada PC. c/o : firefox, chromium, dll.
2. Buka terminal pada root folder folder
3. jalankan perintah `npm run test_ui`
4. UI automation test berhasil dijalankan ditandai dengan kalimat 'allure reporter started...' pada terminal
5. tunggu sampai automation selesai berjalan, ditandai dengan kalimat 'allure reporter closed...' pada terminal

## B. Menjalankan API automation ##
1. Buka terminal pada root folder folder
2. jalankan perintah `npm run test_api`
3. tunggu sampai automation selesai berjalan.

## C. Membuka report hasil dari pengetesan ##
1. jalankan perintah `npm run allure_report` pada terminal untuk generate dan membuka report dari hasil pengetesan
2. automation report terbuka secara otomatis pada browser.
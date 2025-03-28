1. install PHP, composer, laravel, bun, and postgresql on your machine, and make sure to set up correct environment variables on your machine

2. go to your php.ini file (use php --ini to see where it is) and uncomment the lines: "extension=pdo_pgsql", "extension=pgsql", "extension=zip", "extension=openssl", and "extension=fileinfo" (remove the ; before each line and save the file)

3. set up a postgresql database with the name "enterchat"

4. make sure you set up your environment variables so you can actually use these in the command line

5. run: composer install

6. run: bun install

7. run: cp .env.example .env

8. replace the info in .env with appropriate database info

9. run: php artisan key:generate

10. run: php artisan migrate:fresh

11. run: php artisan serve

12. spin up a new terminal window and run: bun run dev

13. go to the terminal window you ran php artisan serve on and go to that localhost:port in your browser

14. app should be running
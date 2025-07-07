---
title: "[🇺🇸] Casa de los Comics Store"
excerpt: "Comics, manga and merchandising store with Laravel!"
date: "Oct 14 2021"
cover_image: "/blog/lalaravel.webp"
alt: "La Casa de los Comics"
tags1: "PHP"
tags2: "SQL"
---

# CASA DE LOS COMICS

![imageTitle](https://i.ibb.co/f4TJcSD/casacomics.png)

## Laravel, PHP and MySQL

Online store made in Laravel and Braintree for Paypal payments.

![StoreGIF](https://i.imgur.com/GaOgDrE.gif)

### Features

Products, Payment, Cart, Orders, Checkout, Payment, Admin panel, Paypal, Mastercard or Visa.

## 📦 Products

![Products](https://i.imgur.com/wAEz6UJ.jpg)

![Product](https://i.imgur.com/3omPNj5.jpg)

## 🛒 Cart

![Cart](https://i.imgur.com/0Pu4B4U.jpg)

## ℹ️ Register

![Cart](https://i.imgur.com/ZGpxdHz.jpeg)

## 💁 About

![Cart](https://i.imgur.com/uovdT1p.jpeg)

---

Tables are loaded from the database named dbventascc into phpmyadmin.

## 🏨 Databases

![Cart](https://i.imgur.com/Abyk012.jpeg)

### Admins Table

```sql
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE IF NOT EXISTS `admins` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@root.com', '$2y$10$rGSPlWzTNYA.TrstOhMk.OQxt61X70IhN6ekvk328hFEEEMJIGMby', 'am6MEUQjGTeNmjnASaeBKpzbyrOfqPM39BK7qp0zaC0axXJncsvoUeXXaV8P', '2021-05-03 08:12:39', '2021-05-03 08:12:39');

-- --------------------------------------------------------
```

### Payments Table

```php
<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// This file allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server. This provides a convenient way to test a Laravel
// application without having installed a "real" web server software here.
if ($uri !== '/' && file_exists(__DIR__.'/public'.$uri)) {
    return false;
}

require_once __DIR__.'/public/index.php';

```

---

### 💻 Console

![Console](https://i.imgur.com/mdeSN2n.jpeg)

### Hashing Functions for passwords

```sql
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Hash Driver
    |--------------------------------------------------------------------------
    |
    | This option controls the default hash driver that will be used to hash
    | passwords for your application. By default, the bcrypt algorithm is
    | used; however, you remain free to modify this option if you wish.
    |
    | Supported: "bcrypt", "argon"
    |
    */

    'driver' => 'bcrypt',

    /*
    |--------------------------------------------------------------------------
    | Bcrypt Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the configuration options that should be used when
    | passwords are hashed using the Bcrypt algorithm. This will allow you
    | to control the amount of time it takes to hash the given password.
    |
    */

    'bcrypt' => [
        'rounds' => env('BCRYPT_ROUNDS', 10),
    ],

    /*
    |--------------------------------------------------------------------------
    | Argon Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the configuration options that should be used when
    | passwords are hashed using the Argon algorithm. These will allow you
    | to control the amount of time it takes to hash the given password.
    |
    */

    'argon' => [
        'memory' => 1024,
        'threads' => 2,
        'time' => 2,
    ],

];
```

---

CRUD functions are available in the `App\Http\Controllers\AdminController` class.

### 🍏 Panel / Dashboard

![Panel](https://i.imgur.com/tjP4fUK.jpeg)

### Inform creator (EXCEL, XML or CSV)

![Informer creator](https://i.imgur.com/CEHGtaz.jpeg)

### Create and update a client or employee

![Update client](https://i.imgur.com/Uqew5jR.jpeg)

### Category list

![Category](https://i.imgur.com/VCgfsgQ.jpeg)

### Index page

![index](https://i.imgur.com/SWrm6qw.jpeg)

---

### ⬇ Download

The project is deprecated and i will not continue to develop it, but you can download it and solve the bugs.

[Download](https://www.mediafire.com/file/o1mz1wkf2cuq6nt/CC.zip/file)

### 📝 License

Copyright © 2024 [Rawier](https://rawier.vercel.app).

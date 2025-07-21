---
title: "The Principle of Least Privilege"
excerpt: "We address the principle of least privilege"
date: "Sep 11 2023"
cover_image: "/blog/lmenor-privilegio.webp"
alt: "User Creation"
tags1: "Helpdesk"
tags2: "Hacking"
---

**Clearing up doubts.**

- What is not allowed must be prohibited.
- A chain is only as strong as its weakest link.
- The security measure is directly proportional to the level of existing risk.
- An ~~old~~ computer dog **must** learn new tricks.
- Computer security is everyone's job.

## In WINDOWS

  ![LeastPrivilege](https://i.ibb.co/nLqgQRQ/image.png)

## In LINUX

**To create a conventional user:**

Authenticate as root user

```js
~$ su -
Password:

~#

```

___

Create the user

```js
useradd userName

```

___

Add password

```js
passwd userName

```

___

To switch to the new user

```js
su userName

```

___

**To create a root user:**

Create the user

```js
useradd -u 0 -o -g 0 userName2

```

___

- **u [UID]** -> user identifier of the new account. The UID (User ID) is added in the [UID] field.
- **o** -> allows creating users with duplicate (non-unique) identifiers (UIDs).
- **g [GROUP]** -> name or identifier of the primary group of the new account.
- **p [PASSWORD]** -> encrypted password of the new account

Explanation: -u 0 we are assigning the userPrueba account the UID (User IDentifier) 0, each account has a user identifier, that of the root account is 0, by assigning the value 0 to userPrueba we are giving it the same user privileges as the root account. Usually you cannot have two accounts with the same UID, that is why the -o option is added, which allows an exception to be made so that it can be done. The -g 0 assigns the GID (Group IDentifier) 0 to userPrueba, so that it belongs to the same group as the root account.

___

**Standard user registration:**

Enter as administrator (root) with:

```js
//option a)
~$ su -
Password: (honeydrive)
//option b)
~$ sudo su -
[sudo] Password: (honeydrive)

```

___

Once inside you will switch to the # symbol and you will be able to create the new standard user;

```js
~#useradd userTest1
~#passwd userTest1 (test1) //optional password

```

and that's it!

You can try to make the configuration changes to authenticate that it is a standard user with:

first we enter the user and then we change the configuration of the eth0 port

___

```js
//enter as user UserTest1
~# su userTest1
//inside the user we make the query of the available ports to confirm that eth0 exists
$ ifconfig

//we try to turn off the eth0 port
$ ifconfig eth0 down
SIOCSIFFLAGS: Permission denied
//expected message denied

```

___

Finally, to return to the Administrator user

```js
//option a)
$su –
Password: (honeydrive)
//option b)
$exit
```

___

**Administrator user registration:**

Enter as administrator (root) with: (repeat step one or confirm being in root #)

```js
~# useradd -u 0 -o -g 0 userTest2
~# passwd userTest2 (test2) //optional password

```

___

You can try to make the configuration changes to authenticate that it is an Administrator user with:

First we enter the administrator user and then we change the configuration of the eth0 port

___

```js
//enter as user UserTest2
~# su userTest2
//inside the user we make the query of the available ports to confirm that eth0 exists
$ ifconfig

//we try to turn off the eth0 port
$ ifconfig eth0 down
//we confirm that the changes have been made
$ ifconfig
//finally we return it to the initial configuration with:
$ ifconfig eth0 up
```

___

  ![OSIModel](https://i.ibb.co/gwkMPTV/image.png)
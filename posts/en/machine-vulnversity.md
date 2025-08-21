---
title: "[WriteUp] - Vulnversity (TryHackMe)"
excerpt: "Vulnversity Machine, Reverse Shell"
date: "Jun 10 2025"
cover_image: "/blog/vulnversity-thm.webp"
alt: "Writeup 2"
tags1: "Hacking"
tags2: "Linux"
---

# "Vulnversity" Machine (TryHackMe)

[📝 Download Spanish PDF Report](https://drive.google.com/file/d/1gkD94lRSYaorLr0cYcpJn_2-CPHzUlEO/view?usp=sharing)

&nbsp;

> *Difficulty Level: ⭐*

&nbsp;

The following is the pentesting report for the **Vulnversity** machine from TryHackMe with an *Easy* difficulty.
It will cover the use of dirsearch (GoBuster or Dirbuster) to the use of Burp Suite Community.

Summary:

* Port scanning
* Vulnerability exploitation
* Remote Reverse Shell

**IMPORTANT** You must have a virtual machine or an auditing operating system with root privileges and an Internet connection.

## Methodology

* Reconnaissance
* Enumeration
* Vulnerability scanning and analysis
* Exploitation
* Post-exploitation

**Reconnaissance**: Answers the questions "What will be attacked?" and "What will be part of the test?"

**Enumeration**: All possible information is collected from what will be attacked to carry out the test without setbacks.

**Vulnerability scanning and analysis**: Identifies weaknesses in what will be attacked, ports, processes, services, among others.

**Exploitation**: Here the attack begins using all the above and with the correct tools.

**Post-exploitation**: Possible extra vulnerabilities are sought or what else can be attacked.

**Test Report**: Everything that is done during the audit is written down.

## Reconnaissance and Enumeration

During the pre-agreement, it was established that the Target machine is on the Network under the IP **10.10.167.123**, so this becomes **the target machine** and on our side our machine is represented with the IP **10.6.42.149**.

Thanks to this we proceed to send a ping to the victim machine and wait for a response.

Once we have the response from the victim machine, we confirm through the TTL that we are facing a **Linux** machine, we still do not know its distribution and version but we will know that later.

With this information we can proceed to launch the scan using **Nmap** and wait for it to give us the result, in this case we use a high *--min-rate* since we are in a controlled laboratory and we can launch multiple traces.

The command broken down:

| Field | Value |
| --- | --- |
| `-sV` | Tries to determine the version of the services that are running |
| `-p <x> or -p-` | Port scan for port `<x>` or all |
| `-Pn` | Disables host detection and open port scanning |
| `-A` | Enables OS and version detection, integrates more scripts |
| `-sC` | Scans the default Nmap scripts |
| `-v` | Verbose mode |
| `-sS` | TCP SYN port scan |
| `-sU` | UDP scan |

**Shell Commands:**

```bash
nmap -p- -sV 10.10.167.123 --min-rate 5000 -oN all_ports.nmap -Pn
```

![nmap scan](https://i.ibb.co/mrV98d3x/img2-0-0.png)

**Severity:** Medium
**Description:**
Once the previous command was executed, it showed us the following services running on the system.

* **21/tcp** FTP v3.0.5
* **22/tcp** SSH
* **139/tcp** SMB 4 NetBIOS-ssn
* **445/tcp** SMB 4
* **3128/tcp** HTTP-PROXY Squid v4.10
* **3333/tcp** HTTP Apache 2.4.41 Ubuntu

Here the vulnerabilities of the listed services are enumerated

* **21/tcp (FTP v3.0.5):** The FTP port is insecure and can be exploited **through anonymous authentication**, cross-site scripting, brute force attacks, and directory traversal attacks.
* **22/tcp (SSH)**: Although SSH is a secure remote access protocol, it can be vulnerable to **brute force attacks on SSH credentials** or the use of private keys to gain access to the target system.
* **139/tcp (SMB 4 NetBIOS-ssn):** The SMB (Server Message Block) protocol has historically been vulnerable to various types of attacks, such as remote code execution and privilege escalation. One of the most famous vulnerabilities is **EternalBlue (MS17-010)**, which affects SMBv1 and was exploited by the WannaCry ransomware.
* **445/tcp (SMB 4):** Similar to 139/tcp, port 445 is also associated with SMB and can be vulnerable to attacks like EternalBlue. In addition, it allows the enumeration of resources and users on a system, which can be exploited by attackers.
* **3128/tcp (HTTP-PROXY Squid v4.10)**: Proxy servers like Squid can be vulnerable to **code injection attacks**, insecure configurations, and exposure of sensitive information. It is important to keep versions updated and correctly configure access rules.
* **3333/tcp (HTTP Apache 2.4.41 Ubuntu):** The Apache HTTP server can be vulnerable to **SQL injections, cross-site scripting, and cross-site request forgery**. It is crucial to apply security patches and keep the software updated.

### Feat

We identified **6** open ports

* *What version of the squid proxy is running on the machine? A: 3.5.12*
* *Using the nmap -n switch, what will it not resolve? A: DNS*
* *What is the most likely operating system this machine is running? A: Ubuntu*
* *What port is the web server running on? A: 3333 (This is quite special, as websites usually run on port 80 (HTTP) or port 443 (HTTPS).)*

![Screenshot of Index page](https://i.ibb.co/nqjzgf0L/img3-1-0.png)

Now we know that a web service with apache is being hosted on port *3333*, which probably means we are facing the **PHP** web language, this is a backend language.

Using dirsearch we find the directories **/images**, **/css**, **/js**, **/fonts**, **/internal**. The first ones do not seem to be special since they correspond to style sheets, scripts, fonts and images, all this for the correct functioning of the page, but there is a directory that is different from the rest and this is **/internal**.

This directory is strange and we have to take a look at it.

```bash
dirsearch -u http://10.10.167.123:3333 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 150
```

![Fuzzing](https://i.ibb.co/k6r4LQLs/img3-2-0.png)

### Internal

**Description:**
Upon entering this address we realize that internal contains a form where files can be uploaded, in this form we realize that not just any file is allowed since it throws us the phrase **Extension not allowed** which means that only certain extensions should allow the file to be uploaded, looking through the page's code we realize that it is not possible to remove this extension filter from the frontend, which means that only the backend can be edited.

Therefore, we only have to find out what type of extension it is not possible to upload the file with.

![Internal front](https://i.ibb.co/LzFKgmQM/img3-3-0.png)

## Exploitation

### Reverse shell

**Description:**
Using Wappalyzer, WhatWeb or another tool or extension we confirm the use of PHP as the language for the website.

This means that we will try some allowed extension that allows us to have control of the server using php, which means that we will look for some php extension that allows it.

To identify which extensions are not blocked, we are going to fuzz the upload form. To do this, we are going to use BurpSuite.

To begin, create a wordlist with the following extensions: in: *.php, .php3, .php4, .php5, .phtml*

![Screenshot of wappalyzer](https://i.ibb.co/yF5w7Hmh/img4-0-0.png)

Using the intruder and sniffer in **Burbsuite** we managed to automate the php extensions and found one that is accepted by the extension filter.

By doing this we find that the allowed extension is **phtml** and thanks to this we know that it is possible to upload some malicious or corrupt file using this type of extension.

![Burbsuite capture](https://i.ibb.co/spCCXKr8/img4-1-0.png)

![Upload the phtml file](https://i.ibb.co/1Dc25Bz/img4-1-1.png)

## Post-Exploitation

**Severity:** Critical

Using dirsearch we discovered the **uploads** directory, in this are the files uploaded from the front.
So knowing this we try to upload a web shell to be able to execute commands, later we try with a more advanced shell using netcat.

As we see in the image we have control of the machine using the user **www-data** who is responsible for apache and the web service.
The next objective would be to escalate privileges to be able to escalate to the **root** user.

With netcat it is possible to create the reverse shell and be able to execute commands from the terminal, we just listen on some port and that's it.

To avoid this it is recommended to supervise the web code ensuring authorized connections.

We create or look for a tiny shell to test (*Simple HTTP Requests GET Method Shell*):

```bash
<?=`$_GET[0]`?>
```

This will give us as a result the execution of the command but from the browser.

![Tiny shell exec](https://i.ibb.co/gMgtGR5F/img4-2-0.png)

To see and execute commands more comfortably from our terminal we will have to create a more complete shell, assigning our ip and port.
And we listen on the same port.

```bash
nc -nlvp 1233
```

## Analysis and Conclusions

As we saw this machine its main problem was making the wrong configurations and leaving a form adrift that should not be seen by a visitor.
A simple form was also found where by uploading the file with the correct extension it was possible to upload the files and infect them with malicious code.

## Recommendations

* Make the appropriate configurations and programming of the web servers, especially in the front-end code.
* Make validations for authorized connection.
* Perform data sanitization in forms.
* Deny access to pages that only the site administrator should know.
* Create a **rate-limit** rule to avoid **fuzzing** and brute force recognition.
* Raise a waf or more advanced filters.- Make the appropriate configurations and programming of the web servers, especially in the front-end code.
* Update
* Use of Firewall
* Use some monitoring tool or SIEM/SOAR.

### Standard

It is recommended to follow the NIST standard, specifically NIST SP 800-53 and NIST SP 800-171.

* NIST SP 800-53: It is a catalog of security controls that cover what is necessary regarding system protection.
    o Limits who can access what (access control).
    o Restricts unnecessary services (attack surface reduction).
    o Ensures system configuration (hardening)
    o Applies patches on time (vulnerability management).
    o Protects and monitors.
    o Documents and responds to incidents
* NIST SP 800-171: Focuses on protecting information in company systems.
    o Strong authentication
    o Secure configurations on the equipment.

## Sources

* Simple PHP Webshell | yuyudhn’s notes. (2024, June 26). Linuxsec.org. <https://htb.linuxsec.org/backdoor-stuff/php-webshell>

### Glossary of Hacking Cybersecurity and Networks

I recommend reviewing my article on this to better understand the terms of this writeup.

🍁 Glossary of terms [--> Glossary](https://aiskoa.vercel.app/es/blog/glossary)

---

&nbsp;

> Thanks for reading my blog, I hope you liked it.

&nbsp;

* 💜 Access to more writeups [--> WriteUps](https://aiskoa.vercel.app/writeup)

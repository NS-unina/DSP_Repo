# NetworkSecurity-Project

Network Security project about SSH, Database and SQL Injection.

# Network Scheme

<img src="https://raw.githubusercontent.com/Tony177/NetworkSecurity-Project/main/Image/network_scheme.svg" width=500>

-   Web Network nodes:
    1. Web Server hosting a stub website using NodeJS.
    2. MySQL Server hosting sensitive information.
-   Employee Network nodes:
    1. BobPC which represents the hacker host.
    2. TomPC which represents the target host.
-   Company Network nodes:
    1. All the Employee network nodes.
    2. Web Server.

# Background Scenario

This lab is about industrial espionage, represented by the attacker Bob, who is infiltrated inside a company lan network and has found, among a lot of devices, one vulnerable computer that belongs to Tom and an useful website open ONLY inside the company network.

During the demonstration scenario, we discovered these IPs from 2 different subnets:

-   _193.20.3.1_ - Company Network 
-   _193.20.3.2_ - Bob PC on company network

-   _193.20.1.1_ - Employee Network
-   _193.20.1.2_ - Bob PC on employee network
-   _193.20.1.3_ - Tom PC on employee network

And we don't have any access to the Web network.

# Start

In order to start this Lab, you've to connect to BobPC with ssh, on your local machine run in any console this command:
```bash
ssh kali@localhost -p 2222
```
and as password insert "_*kali*_".

Now you're connected to BobPC, start the hacking!
## SMURF Attack

The **Smurf attack** is a *Distributed Denial of Service* attack in which large numbers of Internet Control Message Protocol (ICMP) packets (**Echo Ping Requests**), with the victim's spoofed IP as source IP, are broadcast to a computer network using an IP broadcast address. 

Most devices on a network will, by default, respond to this by sending a reply to the source IP address (**Echo Ping Replies**). If the number of machines on the network that receive and respond to these packets is very large, the victim's computer will be flooded with traffic. This can slow down the victim's computer to the point where it becomes impossible to work on.

This Lab is composed by 3 main actors:
1.  **Attacker**: The host who starts the attack, using **hping3 tool**
2.  **Victim**: The host who will be flooded by ICMP Echo Replies and will be tear down
3.  **SMURFs**: Unintentional accomplices who will flood the victims with ICMP Echo Replies

Actually the labs is set up with 150 SMURFs.
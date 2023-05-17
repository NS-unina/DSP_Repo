FROM python
RUN pip3 install boofuzz 
RUN apt-get update && apt-get install git
WORKDIR /home
ADD FuzzME.py /home
ADD FuzzJB.py /home

import socket
import os
import _thread
import gzip
import xml.dom.minidom
import json

def find(name, path):
    for root, dirs, files in os.walk(path):
        if name in files:
            return os.path.join(root, name).replace('\\', '/')
        else:
            return -1

def fix_element(elem):
    if elem[-1] == ':':
        return '"{}":'.format(elem[:-1])
    else:
        return elem

def on_new_client(clientsocket, addr):
    closed=0
    print ('S-a conectat un client.')
    # se proceseaza cererea si se citeste prima linie de text
    cerere = ''
    linieDeStart = ''
    while True:
        data = clientsocket.recv(1024)
        if( len(data) < 1 ): 
            break
        cerere = cerere + data.decode()
        print ('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        pozitie = cerere.find('\r\n')
        if (pozitie > -1 and linieDeStart == ''):
            linieDeStart = cerere[0:pozitie]
            print ('S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####')
            break
    print ('S-a terminat cititrea.')
    if(linieDeStart == ''):
        closed=1
        clientsocket.close()
        print('S-a terminat comunicarea cu clientul - nu s-a primit niciun mesaj.')
	    

    # TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute

    poz1=linieDeStart.find(" ") 
    poz2=linieDeStart.find(" ",poz1+1)
    numeResursa=linieDeStart[poz1+2:poz2]
    if (numeResursa == ''):
	    numeResursa = '/index.html'
    
    poz3=numeResursa.find("/")
    if(poz3>-1):
        numeResursa=numeResursa[poz3+1:]
    print ('Numele resursei:' + numeResursa)

    if(numeResursa=="utilizatori"):
        formular=cerere[cerere.find('uname'):]
        #print(formular)
        #print(' ')
        formular=formular.replace("="," : ")
        formular=formular.replace('&', ' ,\n\t ')
        formular=',\n\t{\n\t\t '+ formular + " }\n]"
        formular=formular.replace(' ', '\"')
       
        print(formular)
        #formular=json.dumps(formular)
        #print(formular)

        users=open("C:/Users/Ioana/Documents/an3/sem2/PW/l8/proiect1-ioanahancu/continut/resurse/utilizatori.json","r")       
        lines = users.readlines()

        users=open("C:/Users/Ioana/Documents/an3/sem2/PW/l8/proiect1-ioanahancu/continut/resurse/utilizatori.json","w")       

        for line in lines:
            if line.strip("\n") != "]":
                users.write(line)
        
        users=open("C:/Users/Ioana/Documents/an3/sem2/PW/l8/proiect1-ioanahancu/continut/resurse/utilizatori.json","a")

        users.writelines('\n')
        users.writelines(formular)
        users.writelines('\n')
        users.close()
       
        clientsocket.sendall(str.encode("OK!"))
        return

    contentType = numeResursa[numeResursa.find('.')+1:]
    print('Tip resursa: '+contentType)
    ### Cerinta 1 ###
    # clientsocket.sendall(str.encode('Hello World! - ' + numeResursa))

    # TODO trimiterea răspunsului HTTP
    linieStartRaspuns = '' 
    ok=-1
    fisierePosibile=['continut', 'continut/css', 'continut/images', 'continut/js', 'continut/resurse']
    k=0
    pathOrig="C:/Users/Ioana/Documents/an3/sem2/PW/l8/proiect1-ioanahancu/"
    path=pathOrig
    while(k<5):
        path += fisierePosibile[k]
        ok = find(numeResursa, path)
        if(ok!=-1):
            #print('tu intri aici?')
            k=5
        else:
            path=pathOrig
        k+=1

    
    if (ok==-1 or ok==None):
        linieStartRaspuns = 'HTTP/1.1 404 Not Found'

    else:
        linieStartRaspuns = "HTTP/1.1 200 OK"

    f = None
    try:
        
        f=open(ok, 'rb')

        print (linieStartRaspuns)
        print ('\r\n')

        clientsocket.sendall(str.encode(linieStartRaspuns + '\r\n'))
        clientsocket.sendall(str.encode('Content-Length: ' + str(os.stat(ok).st_size) + '\r\n'))
        message=''
        if(contentType == 'html'):
            message='Content-Type: text/html \r\n'
        if(contentType == 'css'):
            message='Content-Type: text/css \r\n'
        if(contentType == 'js'):
            message='Content-Type: application/js \r\n'  
        if(contentType == 'png'):
            message='Content-Type: text/png \r\n'
        if(contentType == 'jpg' or contentType == 'jpeg'):
            message='Content-Type: text/jpeg \r\n'
        if(contentType == 'gif'):
            message='Content-Type: text/gif \r\n'
        if(contentType == 'ico'):
            message='Content-Type: image/x-icon \r\n'
        if(contentType == 'json'):
            message='Content-Type: application/json \r\n'
        if(contentType == 'xml'):
            message='Content-Type: application/xml \r\n'
        
        print(message)
        clientsocket.sendall(str.encode(message))

        clientsocket.sendall(str.encode('Content-Encoding: gzip \r\n'))
        print('Server: Serverul meu PW \r\n')
        clientsocket.sendall(str.encode('Server: Serverul meu PW \r\n'))
        clientsocket.sendall(str.encode('\r\n'))

        
        #buf=f.read(1024)
        buf=f.read()
        compressedBuf=gzip.compress(buf,1)
        clientsocket.send(compressedBuf)
        # while (buf):
        #     clientsocket.send(buf)
        #     buf = f.read(1024)
        #     compressedBuf=gzip.compress(buf,1)
       


    except IOError:
        if(closed==0):
            msg = 'Eroare! Resursa ceruta ' + numeResursa + ' nu a putut fi gasita!'
            print (msg)
            clientsocket.sendall(str.encode('HTTP/1.1 404 Not Found\r\n'))
            clientsocket.sendall(str.encode('Content-Length: ' + str(len(msg.encode('utf-8'))) + '\r\n'))
            clientsocket.sendall(str.encode('Content-Type: text/plain\r\n'))
            clientsocket.sendall(str.encode('Server: My PW Server\r\n'))
            clientsocket.sendall(str.encode('\r\n'))
            clientsocket.sendall(str.encode(msg))

    finally:
        if f is not None:
            f.close()

    clientsocket.close()
    print ('S-a terminat comunicarea cu clientul.')


# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

while True:
    print ('#########################################################################')
    print ('Serverul asculta potentiali clienti.')
    # asteapta conectarea unui client la server
    # metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
    (clientsocket, address) = serversocket.accept()
    _thread.start_new_thread(on_new_client, (clientsocket,address))


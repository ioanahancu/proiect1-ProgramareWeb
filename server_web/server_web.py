import socket
import os

def find(name, path):
    for root, dirs, files in os.walk(path):
        if name in files:
            return os.path.join(root, name).replace('\\', '/')
        else:
            return -1

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
    print ('S-a conectat un client.')
# se proceseaza cererea si se citeste prima linie de text
    cerere = ''
    linieDeStart = ''
    while True:
        data = clientsocket.recv(1024)
        cerere = cerere + data.decode()
        print ('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        pozitie = cerere.find('\r\n')
        if (pozitie > -1):
            linieDeStart = cerere[0:pozitie]

            print ('S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####')
            break
    print ('S-a terminat cititrea.')
# TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute

    poz1=linieDeStart.find(" ")
    print(poz1)
    poz2=linieDeStart.find(" ",poz1+1)
    print(poz2)
    numeResursa=linieDeStart[poz1+2:poz2]
    #numeResursa.replace('\\', '/')
    print ('Numele resursei:' + numeResursa)
# TODO trimiterea răspunsului HTTP
    raspuns = '' 
    ok = find(numeResursa, "C:/Users/Ioana/Documents/an3/sem2/PW/l6/proiect1-ioanahancu/continut")
    print(ok)
    if (ok==-1 or ok==None):
        raspuns = 'HTTP/1.1 404 Not Found'
        print (raspuns)

    else:
        raspuns = "HTTP/1.1 200 OK"
        print (raspuns)
        print ('Content-Length: ' )



    clientsocket.close()
    print ('S-a terminat comunicarea cu clientul.')
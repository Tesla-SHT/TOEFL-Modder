import sys
f_name=sys.argv[1]
#input('csv file name (without extension):')
i_file=open(f_name,'r',encoding='utf8')
o_file=open(f_name[:-4]+'.json','w',encoding='utf8')
lines=i_file.readlines()
l_str=lines[0].replace('\ufeff','')
l_str=l_str[:-2]
print(l_str)
flag=False
ind=0
label=['']
i=-1
while i<len(l_str)-1:
    i+=1
    if l_str[i]=='"':
        if i+1<len(l_str) and l_str[i+1]=='"':
            label[ind]+='"'
            i+=1
        else:flag=not(flag)
        continue
    if l_str[i]==',' and not flag:
        ind+=1
        label.append('')
        continue
    label[ind]+=l_str[i]
    
for i in range(ind+1):
    label[i]='"'+label[i]+'"'
    print((label[i]+';'))
o_str='['
for line in range(1,len(lines)):
    o_str+='{'
    l_str=lines[line][:-2]
    flag=False
    ind=0
    txt=['']
    i=-1
    while i <len(l_str)-1:
        i+=1
        if l_str[i]=='"':
            j=i
            while j+1<len(l_str) and l_str[j+1]=='"':
                j+=1
            if(flag):
                if (j-i)%2==1:
                    for tmp in range(int((j-i+1)/2)):txt[ind]+='\\"'
                else:
                    for tmp in range(int((j-i)/2)):txt[ind]+='\\"'
                    flag=False
            else:
                if (j-i)%2==1:
                    for tmp in range(int((j-i-1)/2)):txt[ind]+='\\"'
                else:
                    for tmp in range(int((j-i)/2)):txt[ind]+='\\"'
                    flag=True
            i=j
            continue
        if l_str[i]==',' and not (flag):
                ind+=1
                txt.append('')
                continue
        txt[ind]+=l_str[i]
    for i in range(ind+1):
        #print((txt[i]+';'))
        o_str+=label[i]+':"'+txt[i]+'"'
        if i<ind:o_str+=','
    o_str+='}'
    if line<len(lines)-1:o_str+=','
o_str+=']'
#print(o_str)
o_file.write(o_str)

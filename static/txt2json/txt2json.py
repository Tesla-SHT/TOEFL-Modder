import sys
f_name=sys.argv[1]
#input('txt file name (without extension):')
i_file=open(f_name,'r',encoding='utf8')
o_file=open(f_name[:-4]+'.json','w',encoding='utf8')
lines=i_file.readlines()
l_str=lines[0].replace('\ufeff','')
l_str=l_str[:-2]
label=['Words','Definitions','Example']
o_str='['
for line in range(0,len(lines)):
    o_str+='{'
    l_str=lines[line][:-2]
    if line==0:l_str=l_str.replace('\ufeff','')
    l_w=l_str.split('@')
    for ind in range(1,3):
        txt=['']
        i=-1
        while i <len(l_w[ind])-1:
            i+=1
            if l_w[ind][i]=='"':
                txt+='\\"'
                continue
            txt+=l_w[ind][i]
        o_str+=label[ind]+':"'+txt+'",'
    o_str+='},'
o_str+=']'
#print(o_str)
o_file.write(o_str)

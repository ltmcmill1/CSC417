#function dom(t,row1,row2,     n,a0,a,b0,b,s1,s2)
#    s1,s2,n = 0,0, 0
#    for _ in pairs(t.w) do n=n+1 end
#    for c,w in pairs(t.w) do
#      a0 = row1[c]
#      b0 = row2[c]
#      a  = numNorm( t.nums[c], a0)
#      b  = numNorm( t.nums[c], b0)
#      s1 = s1 - 10^(w * (a-b)/n)
#      s2 = s2 - 10^(w * (b-a)/n)
#    end
#    return s1/n < s2/n 
#  end
#  
#  function doms(t,  n,c,row1,row2,s)
#    n= Lean.dom.samples
#    c= #t.name + 1
#    print(cat(t.name,",") .. ",>dom")
#    for r1=1,#t.rows do
#      row1 = t.rows[r1]
#      row1[c] = 0
#      for s=1,n do
#       row2 = another(r1,t.rows) 
#       s = dom(t,row1,row2) and 1/n or 0
#       row1[c] = row1[c] + s end end
#    dump(t.rows)
#  end

SAMPLES = 100

# read csv from stdin
lines = readlines(stdin)

# parse column names
column_names = []
foreach( x -> push!(column_names, x ), split(lines[1], ",") )

# parse column types, create parsing functions
parsing_functions = Dict()
for i=1:length(column_names)
    column_name = column_names[i]
    first_character = column_name[1]

    if first_character == '<' || first_character == '>' || first_character == '$' # NUMBERS
        parsing_functions[column_name] = x ->
            try 
                return parse.(Int, x)
            catch
                try
                    return parse.(Float64, x)
                catch
                    return x
                end
            end
    elseif first_character == '!' #STRINGS
        parsing_functions[column_name] = x -> return x
    else # OTHERS
        parsing_functions[column_name] = x -> return x
    end
end

print( parsing_functions )

print( "\n\nDONE PARSING COLUMN NAMES\n\n")

# parse lines into 2-d array
rows = Any[]
for i=2:length(lines)
    row = Any[]
    tokens = split(lines[i], ",")

    for j=1:length(tokens)
        push!(row, parsing_functions[ column_names[j] ]( tokens[j] ) )
    end
    # foreach( x -> push!(row, parse(Any,x)), split(lines[i],",") )
    push!(rows, row)
end

print(rows)
print("\n")
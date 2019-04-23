include("mapReduce.jl")
include("table.jl")

t = rows(data())
mapIn = Dict()

N = 100
id = 0

for (id,r) in t["rows"]
  mapIn[id] = [id]
end

function random_assign_map(k, v)
  out = Dict()
  out[v] = []
  while length(out[v]) < N
    i = rand(1:length(t["rows"]))
    while i == k
      i = rand(1:length(t["rows"]))
    end
    push!(out[v], i)
  end
  return out
end

function random_assign_reduce(k, vs)
  global id
  out = Dict()
  for v in vs
    # calculate s of k for each column while pushing values
    # calculate s of v for each column while pushing values
    out[(k,v,id)] = []
    n = length(t["w"])
    for (c, w) in t["w"]
      a0 = t["rows"][k][c]
      b0 = t["rows"][v][c]
      a = numNorm(t["nums"][c], a0)
      b = numNorm(t["nums"][c], b0)
      s1 = -10^(w * (a-b)/n)
      s2 = -10^(w * (b-a)/n)
      push!(out[(k,v,id)], (s1,s2))
    end
    id += 1
  end
  return out
end

function pair_dom_reduce(k, vs)
  out = Dict()
  (row1, row2, i) = k
  out[row1] = []
  sum1 = 0
  sum2 = 0
  n = length(t["w"])
  for v in vs
    # calculate s of k for each column while pushing values
    # calculate s of v for each column while pushing values
    (s1, s2) = v
    sum1 += s1
    sum2 += s2
  end
  push!(out[row1], sum1/n < sum2/n)
  return out
end

function row_dom_reduce(k, vs)
  out = Dict()
  out[k] = []
  dom = 0
  n = length(t["w"])
  for v in vs
    if v
      dom += 1/N
    end
  end
  push!(out[k], dom)
  t["rows"][k][length(t["rows"][k])+1] = dom
  return out
end

reduce(reduce(reduce(map(Dict(mapIn), random_assign_map), random_assign_reduce), pair_dom_reduce), row_dom_reduce)

# Dump out the table dump(t)
for (k,v) in sort(collect(t["name"]))
  print(string(v,","))
end
println(">dom")

printSize = size(collect(keys(t["rows"])))[1]
for i in collect(1:printSize)
  rowLength = size(collect(keys(t["rows"][i])))[1]
  for a in collect(1:rowLength)
    if isa(t["rows"][i][a], AbstractFloat)
      print(round(t["rows"][i][a], 2))
    else
      print(t["rows"][i][a])
    end
    if a != rowLength
    print(",")
    end
  end
  println()
end
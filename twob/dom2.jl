include("mapReduce.jl")
include("table.jl")

t = rows(data())
println("table processed")
mapIn = Dict()

N = 2

for (id,r) in t["rows"]
  mapIn[id] = [r]
end


function random_assign_map(k, v)
  out = Dict()
  out[v] = []
  while length(out[v]) < N
    i = rand(1:length(t["rows"]))
    while i == k
      i = rand(1:length(t["rows"]))
    end
    push!(out[v], t["rows"][i])
  end
  return out
end

function random_assign_reduce(k, vs)
  out = Dict()
  out[k] = []
  for v in vs
    # calculate s of k for each column while pushing values
    # calculate s of v for each column while pushing values
    push!(out[k], k)
  end
  return out
end


println(map(Dict(mapIn), random_assign_map))
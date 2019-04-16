function my_merge(dict1, dict2)
  for (k, vs) in dict2
    if !haskey(dict1, k)
      dict1[k] = []
    end
    for v in vs
      push!(dict1[k], v)
    end
  end
end


function map(dict, f)
  out = Dict()
  for (k, vs) in dict
    for v in vs
      my_merge(out, f(k, v))
    end
  end
  return out
end

function individual_map(k, v)
  out = Dict()
  out[k+1] = []
  push!(out[k+1], v)
  return out
end

function reduce(dict, f)
  out = Dict()
  for (k, vs) in dict
    my_merge(out, f(k, vs))
  end
  return out
end

function individual_reduce(k, vs)
  out = Dict()
  concatenated = ""
  for v in vs
    concatenated = string(concatenated, v)
  end
  out[k] = [concatenated]
  return out
end

println(reduce(map(Dict(1=>["one", "two"], 2=>["two"], 3=>["three"]), individual_map), individual_reduce))
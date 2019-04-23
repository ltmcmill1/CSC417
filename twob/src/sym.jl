function sym()
  return Dict("counts"=>Dict(), "mode"=>nothing, "most"=>0, "n"=>0, "_ent"=>nothing)
end

function symInc(t, x)
  if x=="?"
    return x
  end
  t["_ent"] = nothing
  t["n"] = t["n"] + 1
  if (haskey(t["counts"], x))
    new = (t["counts"][x] + 1)
  else
    new = 1
  end
  t["counts"][x] = new
  if new > t["most"]
    t["most"] = new
    t["mode"] = x
  end
  return x
end
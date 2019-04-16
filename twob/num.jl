function num()
  return Dict("n"=>0.0, "mu"=>0.0, "m2"=>0.0, "sd"=>0.0, "lo"=>-10^32, "hi"=>1*10^32, "w"=>1)
end

function numInc(t, x)
  if x == "?"
    return x
  end
  t["n"] = t["n"] + 1
  d = x - t["mu"]
  t["mu"] = t["mu"] + d/t["n"]
  t["m2"] = t["m2"] + d*(x - t["mu"])
  if x > t["hi"]
    t["hi"] = x
  end
  if x < t["lo"]
    t["lo"] = x
  end
  if (t["n"] >= 2)
    t["sd"] = (t["m2"]/(t["n"] - 1))^0.5
  end
  return x
end
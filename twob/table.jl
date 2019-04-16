include("num.jl")
include("sym.jl")

function data()
  return Dict("w"=>Dict(), "syms"=>Dict(), "nums"=>Dict(), "class"=>nothing, "rows"=>Dict(), "name"=>Dict(), "col"=>Dict(), "_use"=>Dict())
end

function header(cells, t)
  t["indeps"] = Dict()
  for (c0, x) in enumerate(cells)
    if !ismatch(r"[?]", x)
      c = length(t["_use"]) + 1
      t["_use"][c] = c0
      t["name"][c] = x
      t["col"][x] = c
      if ismatch(r"[<>%$]", x)
        t["nums"][c] = num()
      else
        t["syms"][c] = sym()
      end
      if contains(x, "<")
        t["w"][c] = -1
      elseif contains(x, ">")
        t["w"][c] = 1
      elseif contains(x, "!")
        t["class"] = c
      else
        t["indeps"][length(t["indeps"])+1] = c
      end
    end
  end
  return t
end

function row(t, cells)
  r = length(t["rows"]) + 1
  t["rows"][r] = Dict()
  for (c, c0) in t["_use"]
    x = cells[c0]
    if x != "?"
      if haskey(t["nums"], c)
        x = parse(Float64,x)
        numInc(t["nums"][c], x)
      else
        symInc(t["syms"][c], x)
      end
    end
    t["rows"][r][c] = x
  end
  return t
end

function rows(t)
  first = true
  line = readline()
  while true
    line = replace(line, r"[\t\r ]*", "")
    line = replace(line, r"#.*", "")
    cells = split(line, ",")
    if length(cells) > 0
      if first
        header(cells, t)
      else
        row(t, cells)
      end
      first = false
    end
    if (eof(STDIN))
      break
    end
    line = readline()
  end
  return t
end
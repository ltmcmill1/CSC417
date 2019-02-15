(defun known (a pairs)
  (if (assoc a pairs)
    (known (cdr(assoc a pairs)) pairs)
    a))

(KNOWN '?X
    '((#:?3044 . DEBBIE) (#:?3045 . DONALD) 
      (?Y . #:?3044) (?X . #:?3045)))
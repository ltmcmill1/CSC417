(defun var? (x)
  (and (symbolp x) 
       (eql (char (symbol-name x) 0) #\?)))

(defun has-vars (x)
  (if (not x) (return-from has-vars nil))
  (if (var? x) (return-from has-vars (cons x nil)))
  (if (not (listp x)) (return-from has-vars nil))
  (union (has-vars (car x))
  (has-vars (cdr x))))

(HAS-VARS '(AND (PARENT ?X ?Y) (MALE ?X)))
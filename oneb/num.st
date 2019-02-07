Magic sub: #Num has: 'n mu m2 sd w lo hi'
! Num methods !
init
  self n: 0;
       mu: 0;
       m2: 0;
       sd: 0;
       w: 1;
       lo: ( 10 raisedTo: 32 );
       hi: ( -1 * ( 10 raisedTo: 32 ) ) !

numInc: x
| d |
  x = '?' ifTrue: [^x].
  n := n + 1.
  d := x - mu.
  mu := mu + ( d / n ).
  m2 := m2 + ( d * ( x - mu ) ).
  x > hi ifTrue: [ hi := x ].
  x < lo ifTrue: [ lo := x ]. 
  n >= 2 ifTrue: [ sd := ( m2 / ( n - 1 + ( 10 raisedTo: -32 ) ) ) raisedTo: 0.5 ].
  ^x !
  
numDec: x
| d |
  x = '?' ifTrue: [^x].
  n = 1 ifTrue: [^x].
  n := n - 1.
  d := x - mu.
  mu := mu - ( d / n ).
  m2 := m2 - ( d * ( x - mu ) ).
  n >= 2 ifTrue: [ sd := ( m2 / ( n - 1 + ( 10 raisedTo: -32 ) ) ) raisedTo: 0.5 ].
  ^x !

nextPut: x
  self numInc: x !

nextPutAll: items
  items do: [:a | self nextPut: a ]. !
  
printOn: aStream
  aStream 
     nextPutAll: 'Num(';
     nextPutAll: ' n=',n s;
     nextPutAll: ' mu=',mu s;
     nextPutAll: ' m2=',m2 s;
     nextPutAll: ' sd=',sd s;
     nextPutAll: ' w=',w s;
     nextPutAll: ' lo=',lo s;
     nextPutAll: ' hi=',hi s;
     nextPutAll: ')' !
!
! Collection methods !
eject: aBlock
  | collection1 |
  collection1 := self select: [:x | aBlock value: x ].
  ^ self select: [:x | ( collection1 includes: x ) not ] !
!

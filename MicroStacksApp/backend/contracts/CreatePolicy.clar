
;;title: CreatePolicy
;; version:
;; summary:
;; description:

;; constants
;;
(define-constant contract-owner tx-sender)

(define-constant price u1)

;; errors
;;
(define-constant err-owner-only (err u100))
(define-constant err-already-locked (err u101))
(define-constant err-more-votes-than-members-required (err u102))
(define-constant err-not-a-member (err u103))
(define-constant err-votes-required-not-met (err u104))

;; data vars
;;
(define-data-var total-policies uint u0)
(define-data-var votes-required uint u1)
(define-data-var members uint u1)


;; data maps
;;
(define-map policies principal (string-utf8 500))
(define-map votes {user: principal, recipient: principal} {decicion: bool})

;; public functions
;;

(define-public (start (new-members (list 100 principal)) (new-votes-required uint))
    (begin
        (asserts! (is-eq contract-caller contract-owner) err-owner-only)
        (asserts! (is-eq (var-get members) u0) err-already-locked)
        (asserts! (>= (len new-members) new-votes-required) err-more-votes-than-members-required)
        (var-set members (len new-members))
        (var-set votes-required new-votes-required)
        (ok true)
    )
)


(define-public (create-policy (message (string-utf8 500)))
  (begin
    (try! (stx-transfer? price tx-sender contract-owner))
    ;; #[allow(unchecked_data)]
    (map-set policies tx-sender message)
    (var-set total-policies (+ (var-get total-policies) u1))
    (ok "SUCCESS")
  )
)

;; read only functions
;;

;;(define-read-only (get-total-policies))

;;(define-read-only (getPolicies))



;; private functions
;;


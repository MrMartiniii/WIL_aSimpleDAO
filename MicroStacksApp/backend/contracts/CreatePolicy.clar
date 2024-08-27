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
(define-constant err-insufficient-balance (err u106))

;; data vars
;;
(define-data-var total-policies uint u0)
(define-data-var votes-required uint u1)
(define-data-var members (list 100 principal) (list))


;; data maps
;;
(define-map policies principal {message: (string-utf8 500), amount: uint})
(define-map votes {member: principal, recipient: principal} {decision: bool})

;; public functions
;;

(define-public (start (new-members (list 100 principal)) (new-votes-required uint))
    (begin
        (asserts! (is-eq contract-caller contract-owner) err-owner-only)
        (asserts! (is-eq (len (var-get members)) u0) err-already-locked)
        (asserts! (>= (len new-members) new-votes-required) err-more-votes-than-members-required)
        (var-set members new-members)
        (var-set votes-required new-votes-required)
        (ok true)
    )
)


(define-public (create-policy (message (string-utf8 500)) (amount uint))
  (begin
    (try! (stx-transfer? price tx-sender contract-owner))
    ;; #[allow(unchecked_data)]
    (map-set policies tx-sender {message: message, amount: amount})
    (var-set total-policies (+ (var-get total-policies) u1))
    (ok "SUCCESS")
  )
)

(define-public (vote (recipient principal) (decision bool))
    (begin
        (asserts! (is-some (index-of (var-get members) contract-caller)) err-not-a-member)
        ;; #[allow(unchecked_data)]
        (ok (map-set votes {member: tx-sender, recipient: recipient} {decision: decision}))
    )
)

;;Withdraw
(define-public (withdraw)
    (let
        (
            (recipient tx-sender)
            (total-votes (tally-votes))
            (policy (map-get? policies recipient))
            (amount (unwrap! (get amount policy) (err u105))) ;;get the amount of tokens from the policy
        )
        (begin ;; using begin to order the code
            (asserts! (>= total-votes (var-get votes-required)) err-votes-required-not-met)
            (asserts! (>= (stx-get-balance (as-contract tx-sender)) amount) (err u106)) ;; use this to check there is enough funds in the pool 
            (try! (as-contract (stx-transfer? (stx-get-balance tx-sender) tx-sender recipient))) ;; transfer the specific amount 
            (ok total-votes)
        )
    )
)

;;Deposit to contract
(define-public (deposit (amount uint)) 
    (stx-transfer? amount tx-sender (as-contract tx-sender))
)


;; read only functions
;;
(define-read-only (get-vote (member principal) (recipient principal))
    (default-to false (get decision (map-get? votes {member: member, recipient: recipient})))
)

(define-read-only (tally-votes) 
    (fold tally (var-get members) u0)
)
;;(define-read-only (get-total-policies))

;;(define-read-only (getPolicies))



;; private functions
;;

(define-private (tally (member principal) (accumulator uint)) 
    (if (get-vote member tx-sender) (+ accumulator u1) accumulator)
)
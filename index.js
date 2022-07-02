/**
 * the main task this method does is converting the actual music ID to a different music ID so that a uniquness could be maintained in the ID string
 *
 * now I have designed this algorithm in such a way that this function itself will do both encryption and decryption together with the same code
 * doesn't matter what step is followed at what position
 * irrespective of steps this method will work absolutely fine!!
 *
 *
 * @Algorithm
 *
 * at initial call the method checks if the provided ID is of any length if it is then only it procceds to the next algorithm
 * next this method changes all the lowecase characters to uppercase and uppercase characters to lowecase and saves it in a different variable let's say @var1
 * next up it reverses @var1 and stores it in @var2
 *
 * another task is to change all the characters in the ID
 * so let's create a @var3 to store this string
 * so for that this program generates a random number between 1 and 12 inclusively, you will get to know why only 1 and 9 ( let's store this in a variable named @randomNumber )
 * next up, a itteration start over all the characters of @var2 (the reversed string id)
 *
 * 1. and checks if the character is lowercased then checks if the character is less than 'm' (since 'm' is in the middle of alphabets, so I choosed 13th character to split the operations)
 *      ok now if the lowercase character is less than 'm' then append @var3 after adding @randomNumber to that lowecase character's ascii value and back to character
 *      else if the lowecase character is more than 'm' then append @var3 after subtracting @randomNumber from that lowecase character's ascii value and back to character
 *
 * 2. and checks if the character is uppercased then checks if the character is less than 'm' (since 'm' is in the middle of alphabets, so I choosed 13th character to split the operations)
 *      ok now if the uppercase character is less than 'm' then append @var3 after adding @randomNumber to that uppercase character's ascii value and back to character
 *      else if the uppercase character is more than 'm' then append @var3 after subtracting @randomNumber from that uppercase character's ascii value and back to character
 *
 * the 1st and 2nd task is almost same, the difference is 1st task is for lowercase and 2nd is for uppercase characters
 *
 * 3. if the character is a number than append the @var3 string after subtracting the numbered character from 9
 *      or in other word this -> @var3 += 9 - @var2 [ith character]
 *
 * 4. now if the character is - than replace it with _ and vice versa, - to _ and _ to -
 *
 * this itteration if over
 *
 * and final step is to add the random number to the front of the string, so that at the time of reversing these all (decrypting)
 * we can know what random number we have choosed during encryption
 *
 * and return the final string
 *
 *
 * so now you got to know why we choose a random number betwen 1 and 9, its because if we choose less than 1, let say 0 then after adding/subtracting the character will not change
 *      and also we haven't choosed a number more than 9 (we could choosed more than 9 since we have also choosed 'm' the 13th character, so the limit is 12)
 *      because if we choose a upper range more than 9 then two major things will got affected:
 * 1. first the final string could go length of 13 if we choose @randomNumber as (10, 11, 12 or 13) which we don't want
 * 2. at time of decryption, we cannot decide if the first or both first and second character of the
 *      encrypted string ID is the @randomNumber we generated during encryption.
 *      the second character of encrypted string could be the part of actual ID.
 *      so it will generate ambiguity, for that purpose, we have to choose a random number only between 1 and 9 (yeah inclusive is fine)
 *
 * but at last we decided to choose the random number as static number which would be 13
 * this is because let's say for adding - when we add 9 to 11(k) it becomes more than 13(m) and could be subtracted during decryption easily
 *                                      but when adding 9 to 1(a) if produces 10(j) which is still less than 13 and during decryption we still cannot decided whether this was more than 13 or less than 13 before encryption
 * so finally I have personally decided to make the random number stuck to a static number as 13
 *
 * @param {string} ID any length characters long string denoting a musicID
 * @returns a same length string after encrypting it in other format than the antual ID
 */
function endcrypt(ID = '') {
    /**
     * change the casing of every alphabet characters
     * lowecase to upper case and uppercase to lowecase character
     */
    let caseExchange = '' // case toggled string ID
    for (let i = 0; i < ID.length; ++i)
        if (ID[i] >= 'a' && ID[i] <= 'z') caseExchange += ID[i].toUpperCase()
        else if (ID[i] >= 'A' && ID[i] <= 'Z')
            caseExchange += ID[i].toLowerCase()
        else caseExchange += ID[i]

    /**
     * reversing the whole string
     * since we don't have a reverse method for string itself
     * so first converting the sting to array of characters and reversing it (since array has such methods)
     * and finally converting all the elements to string
     * by join method of string array
     */
    let reversedID = caseExchange.split('').reverse().join('')

    /**
     * a random number
     * this is very important for the encryption process,
     * 72% of the decryption process needs acces to this @randomNumber
     */
    const randomNumber = 13 // Math.floor(Math.random() * (9 - 1 + 1)) + 1
    let encryptedID = '' // a variable to store the encrypted string ID
    for (let i = 0; i < reversedID.length; ++i)
        // if the ith character is lowercase character
        if (reversedID[i] >= 'a' && reversedID[i] <= 'z')
            if (reversedID[i] <= 'm')
                /**
                 * if the ith character is less than 'm'
                 * add the random number to the ith character and append to @encryptedID
                 */
                encryptedID += String.fromCharCode(
                    reversedID[i].charCodeAt(0) + randomNumber,
                )
            /**
             * if the ith character is more than 'm'
             * subtract the random number with the ith character and append to @encryptedID
             */ else
                encryptedID += String.fromCharCode(
                    reversedID[i].charCodeAt(0) - randomNumber,
                )
        // if the ith character is uppercase character
        else if (reversedID[i] >= 'A' && reversedID[i] <= 'Z')
            if (reversedID[i] <= 'M')
                /**
                 * if the ith character is less than 'M'
                 * add the random number to the ith character and append to @encryptedID
                 */
                encryptedID += String.fromCharCode(
                    reversedID[i].charCodeAt(0) + randomNumber,
                )
            /**
             * if the ith character is more than 'M'
             * subtract the random number with the ith character and append to @encryptedID
             */ else
                encryptedID += String.fromCharCode(
                    reversedID[i].charCodeAt(0) - randomNumber,
                )
        /**
         * if the character if a number
         * append @encryptedID after subtracting the number from 9 in string format afterwards
         */
        //
        else if (reversedID[i] >= '0' && reversedID[i] <= '9')
            encryptedID += String(Number(9 - reversedID[i]))
        // if the character is - than change it to _ and append to @encryptedID
        else if (reversedID[i] === '-') encryptedID += '_'
        // if the character is _ than change it to - and append to @encryptedID
        else if (reversedID[i] === '_') encryptedID += '-'

    /**
     * finally add the randomNumber at the front of the final string
     * so that it could be accessed at the time of decryption of the ID
     */
    const finalEncryptedID = encryptedID // + randomNumber
    // and at last return the whole string
    return finalEncryptedID
    // finally after such a time of thinking this simple encrytion is implemented
}

const id = 'gGSBN5raY8M'
console.log(id, endcrypt(id), endcrypt(endcrypt(id)))
console.log(id === endcrypt(endcrypt(id)))

// gGSBN5raY8M
// 61tHrSFkPFo
// seXu3jYxs0Y

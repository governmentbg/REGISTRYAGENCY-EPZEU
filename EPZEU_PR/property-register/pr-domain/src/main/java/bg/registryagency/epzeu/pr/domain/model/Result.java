package bg.registryagency.epzeu.pr.domain.model;

import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * <div class="bg">
 *  Класа се използва като обвивка на резултата, който се връща от search repository методи и други, които са дизайнати да връщат
 *  един или повече обекти като резултат.
 *  Използва се за резултати със странициране, за резултати с повече от един обекти без странициране и за резултати с точно един върнат обект.
 *  Когато класа се използва за резултат върнат от search процедура тогава резултата ще има колекция от обекти, ако се използват критерии,
 *  които еднозначно гарантират, че ще бъде върнат най-много един обект то тогава може да се използва {@link Result#single()}
 * </div>
 *
 * <div class="en">
 *  Wrapper for returned result from search repository methods and other which are designed to return one or more than one objects.
 *  Wrapper is used for result with pagination, for result with more than one objects without pagination and for single result.
 *  Search procedures are designed to return collections, but when passed criteria which expects only one object to be returned, use {@link Result#single()}
 * </div>
 * @param <T> <div class="bg">моделът, на очаквания върнат резултат.</div>
 *           <div class="en">is domain model which result is prepared for.</div>
 *
 */
public class Result<T> {
    /**
     * <div class="bg">
     *  Брой на намерените резултати по определени критерии.
     *  Ако резултата се използва за процедури със странициране то броят({@link #count}) отговаря на целия намерен резултат
     *  според критериите на търсене, а не на броя върнат резултат за текущата страница.
     * </div>
     *
     * <div class="en">
     *  Count of found objects by specific search criteria.
     *  If procedure support pagination this count is not count of the returned page but count of the whole found result.
     * </div>
     */
    private final Integer count;
    /**
     * <div class="bg">
     *  Намерени обекти според критериите на търсене на резултат.
     *  Ако резултата се използва при търсене със странициране то ({@link #objects}) ще отговарят на обектите за съответната страница.
     * </div>
     * <div class="en">
     *  Found objects by specific search criteria.
     *  If procedure support pagination these objects will be the relevant page of the whole result.
     * </div>
     */
    private final List<T> objects;

    /**
     * <div class="bg">
     *  Конструктор за създаване на Result когато броят на намерените обекти не е необходим.
     *  Обикновенно броят не е необходим, когато Result се използва при резултати, които не поддържат странициране.
     * </div>
     *
     * <div class="en">
     *  Constructor for Result when count is not needed.
     *  Usually count is not needed when procedure not support pagination.
     * </div>
     * @param objects
     * <div class="bg">които са върнати като резултат от търсене</div>
     * <div class="en">which are returned as result of searching</div>
     */
    public Result(List<T> objects) {
        this.count = null;
        this.objects = objects;
    }

    /**
     * <div class="bg">
     *  Конструктор за създаване на Result, който се използва за резултати със странициране.
     * </div>
     * <div class="en">
     *  Constructor for Result which is useful for pagination.
     * </div>
     * @param count
     * <div class="bg">брой на целия намерен резултат(а не на брой за текуща страница, когато се поддържа странициране)</div>
     * <div class="en">count of the whole found result</div>
     * @param objects
     * <div class="bg">които са върнати като резултат от търсене</div>
     * <div class="en">which are returned as result of searching</div>
     */
    public Result(Integer count, List<T> objects) {
        this.count = count;
        this.objects = objects;
    }

    /**
     * @return
     * <div class="bg">брой на целия намерен резултат(а не на брой за текуща страница, когато се поддържа странициране)</div>
     * <div class="en">count of the whole found result</div>
     */
    public Integer getCount() {
        return count;
    }

    /**
     * @return
     * <div class="bg">намерените обекти резултат от търсене</div>
     * <div class="en">found objects as result of searching</div>
     */
    public List<T> getObjects() {
        return objects;
    }

    /**
     * <div class="en">
     *  Помощен метод за връщане на единичен резултат.
     *  Използва се обикновенно, когато резултата е от точно един обект, а не колекция от обекти.
     *  Един пример е когато се извиква search процедура с критерии, които гарантирано отговарят за намирането на точно един обект(търсене по id).
     * </div>
     * <div class="en">
     *  Helper method to return one object from result.
     *  Usually used when result is exactly one object.
     *  One example is when invoke search procedure with criteria which will return result with exactly one object.
     * </div>
     *
     * @return
     * <div class="bg">Единичен обект или null когато нищо не е намерено.</div>
     * <div class="en">Single object or null if not found.</div>
     */
    public T single() {
        if(!CollectionUtils.isEmpty(objects)) {
            return objects.get(0);
        }
        return null;
    }
}

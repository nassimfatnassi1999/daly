import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MenuComponent } from './menu.component';
import { Dish } from '../../models/Dish';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { of } from 'rxjs';
import { RestaurantCategory } from 'src/app/models/RestaurantCategory';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let mockActivatedRoute: any;
  let mockRestaurantService: jasmine.SpyObj<RestaurantService>;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: '1' }) // Mocking ActivatedRoute's params with a mock observable
    };

    mockRestaurantService = jasmine.createSpyObj('RestaurantService', ['getDishesByRestaurantId']);

    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RestaurantService, useValue: mockRestaurantService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch dishes when initialized', () => {
    const dishes: Dish[] = [{ 
      id_dish: 1,
      name: 'Dish Name',
      price: 10,
      description: 'Description of the dish',
      category: 'Category of the dish',
      photo: 'URL of the dish photo',
      orders:0,
      restaurant: {
        id_restaurant: 0,
        name: '',
        logo: '',
        category: RestaurantCategory.Cafe,
        averageRating: 0,
        waitTime: 0,
        isEcoFriendly: false,
        contactInfo: '',
        delivery: false,
        total_orders:0,
        menu: [],
      }
    }];

    mockRestaurantService.getDishesByRestaurantId.and.returnValue(of(dishes));

    component.ngOnInit();

    expect(component.dishes).toEqual(dishes);
  });

  it('should add dish to order list', () => {
    const dish: Dish = { 
      id_dish: 1,
      name: 'Dish Name',
      price: 10,
      orders:0,
      description: 'Description of the dish',
      category: 'Category of the dish',
      photo: 'URL of the dish photo',
      restaurant: {
        id_restaurant: 0,
        name: '',
        logo: '',
        category: RestaurantCategory.Cafe,
        averageRating: 0,
        waitTime: 0,
        isEcoFriendly: false,
        contactInfo: '',
        delivery: false,
        total_orders:0,
        menu: [],
      }
    };
    
    const initialOrderListLength = component.orderList.length;

    component.addToOrderList(dish);

    expect(component.orderList.length).toBe(initialOrderListLength + 1);
    expect(component.orderList[initialOrderListLength]).toEqual(dish);
  });
});

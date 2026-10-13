import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';
import { IconAtom } from '@brejcha13320/design-system-bootstrap';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent, IconAtom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería tener el texto vacío por defecto', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component.text).toBe('');
  });

  it('debería aplicar la clase correcta cuando el estado es "loading"', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    const cssClass = component.getClass();
    expect(cssClass).toContain('alert-primary');
  });

  it('debería aplicar la clase correcta cuando el estado es "error"', () => {
    component.alertState = 'error';
    fixture.detectChanges();
    const cssClass = component.getClass();
    expect(cssClass).toContain('alert-danger');
  });

  it('debería mapear correctamente los estados en alertClassMap', () => {
    const map = component.alertClassMap;
    expect(map['loading']).toBe('primary');
    expect(map['error']).toBe('danger');
  });

  it('debería renderizar el texto recibido por input en loading', () => {
    component.alertState = 'loading';
    component.text = 'Cargando datos...';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Cargando datos...');
  });

  it('debería renderizar el texto recibido por input en error', () => {
    component.alertState = 'error';
    component.text = 'Error al cargar los datos';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Error al cargar los datos');
  });

  it('no debería lanzar errores al llamar getClass con un estado válido', () => {
    component.alertState = 'loading';
    expect(() => component.getClass()).not.toThrow();
  });

  it('con alertState "loading" se renderiza el spinner y NO el icono', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    const icon = fixture.debugElement.query(By.directive(IconAtom));

    expect(spinner).toBeTruthy();
    expect(icon).toBeFalsy();
  });

  it('con alertState "error" se renderiza el icono y NO el spinner', () => {
    component.alertState = 'error';
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    const icon = fixture.debugElement.query(By.directive(IconAtom));

    expect(icon).toBeTruthy();
    expect(spinner).toBeFalsy();
  });
});

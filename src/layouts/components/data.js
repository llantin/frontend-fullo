import * as TbIcons from 'react-icons/tb';
import * as LuIcons from 'react-icons/lu';
import { getUserModules } from '../../features/modules/services/moduleService';

/* const storedUser = localStorage.getItem('user');
const user = storedUser ? JSON.parse(storedUser) : null;
const roleId = user?.role_id; */

// Función para obtener los módulos del usuario
const getModulesForMenu = async () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const roleId = user?.role_id;
  if (!roleId) return [];

  try {
    const response = await getUserModules(roleId);

    return response.map(item => {
      const module = item.modules;
      // buscar el icono en Tb o Lu
      const Icon =
        TbIcons[module.icon] ||
        LuIcons[module.icon] ||
        null;

      return {
        key: module.id,
        label: module.name,
        icon: Icon,
        url: module.route
      };
    });
  } catch (error) {
    console.error('Error al cargar módulos:', error);
    return [];
  }
};

export const userDropdownItems = [{
  label: 'Hola de nuevo!',
  isHeader: true
}, {
  label: 'Mi perfil',
  icon: TbIcons.TbUserCircle,
  url: '/perfil'
}, {
  label: 'Soporte',
  icon: TbIcons.TbHeadset,
  url: '/soporte'
}, {
  isDivider: true
}, {
  label: 'Cerrar sesión',
  icon: TbIcons.TbLogout2,
  url: '',
  class: 'text-danger fw-semibold'
}];

// Menu base hasta "Apps"
const baseMenuItems = [{
  key: 'navigation',
  label: 'Principal',
  isTitle: true
}, {
  key: 'dashboard',
  label: 'Dashboard',
  icon: LuIcons.LuCircleGauge,
  url: '/dashboard'
}, {
  key: 'apps',
  label: 'Gestionar',
  isTitle: true
}];


// Función para construir el menú completo con módulos dinámicos
export const buildMenuItems = async () => {
  const userModules = await getModulesForMenu();
  return [
    ...baseMenuItems,
    ...userModules
  ];
};

// Export del menú estático original (para compatibilidad)
export const menuItems = [
  ...baseMenuItems
];
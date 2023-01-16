import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ProductoFactura, ProductoFacturaRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class ProductoFacturaRepository extends DefaultCrudRepository<
  ProductoFactura,
  typeof ProductoFactura.prototype.id,
  ProductoFacturaRelations
> {

  public readonly pertenece_a: BelongsToAccessor<Factura, typeof ProductoFactura.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(ProductoFactura, dataSource);
    this.pertenece_a = this.createBelongsToAccessorFor('pertenece_a', facturaRepositoryGetter,);
    this.registerInclusionResolver('pertenece_a', this.pertenece_a.inclusionResolver);
  }
}
